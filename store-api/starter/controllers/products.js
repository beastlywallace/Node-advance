const Product = require("../models/products");

const getAllProductsStatic = async (req, res) => {
  // throw new Error('testing async errors')
  // const {name}= req.body
  const products = await Product.find({ price: { $gt: 70 } }) //i.e price greater than 30 $lt less than
    .sort("-name")
    .select("name price")
    .limit(4);
  // .skip(2),mean skip the first 2
  //we have .select('name price')  meaning only the name will com out

  res.status(200).json({ products, nbHits: products.length });
};
const getAllProducts = async (req, res) => {
  //for query
  const { featured, company, name, fields, sort, numericFilters } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $option: i };
  }
  if (numericFilters) {
      console.log(numericFilters)  
    //   e.g price > 40, rating >= 4
      const operatorMap = {
          '>': '$gt',
          '<': '$lt',
          '>=': '$gte',
          '<=': '$lte',
          '=':'$et'
         
      }
      const regEx = /\b(<|>|>=|=|<|<=)\b/g
      let filters = numericFilters.replace(
          regEx,
          (match) => `-${operatorMap[match]}-`)
      console.log(filters)
      const options = ['price', 'rating']
      filters = filters.split(',').forEach((item) => {
          const [field, operator, value] = item.split('-')
          if (options.includes(field)) {
              queryObject[field] = {[operator]: Number(value)}
          }
      })
  }

  console.log("obj", queryObject);
  let result = Product.find(queryObject);
  //sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createAt");
  }

  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  //pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);

  const products = await result;

  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
