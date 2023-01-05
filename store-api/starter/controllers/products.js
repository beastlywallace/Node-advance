const Product = require('../models/products')

const getAllProductsStatic = async (req, res) => {
    // throw new Error('testing async errors')
// const {name}= req.body
    const products = await Product.find({}).sort('-name').select('name price') 
    //we have .select('name price')  meaning only the name will com out

    res.status(200).json({ products, nbHits: products.length})
}
const getAllProducts = async (req, res) => {
    //for query
    const { featured, company, name , fields, sort} = req.query
    const queryObject={}
   
    
    if (featured) {
        queryObject.featured = featured ==='true' ? true: false
    }
    if (company) {
        queryObject.company = company
    }
    if (name) {
        queryObject.name= {$regex: name, $option: i}
    }

    let result = Product.find(queryObject)
    //sort
    if (sort) {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    } else {
        result = result.sort(createdAt)
    }

    if (fields) {
        const fieldsList = fields.split(',').join(' ')
        result = result.select(sortList)
    }

     const products= Product.find(queryObject)
      res.status(200).json({ products, nbHits: products.length})
    
}

module.exports = {
    getAllProducts,getAllProductsStatic
}