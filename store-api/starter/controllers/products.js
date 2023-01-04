const Product = require('../models/products')

const getAllProductsStatic = async (req, res) => {
    // throw new Error('testing async errors')
    const products = await Product.find({featured: false})
    console.log(products)
    res.status(200).json({ products, nbHits: products.length})
}
const getAllProducts = async (req, res) => {
    const products= Product.find(req.query)
    
    res.status(200).json({msg: "products  route"})
}

module.exports = {
    getAllProducts,getAllProductsStatic
}