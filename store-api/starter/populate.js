require('dotenv').config()

// const mongoose

const connectDB = require('./db/connect');
const Product = require('./models/products')

const jsonProducts = require('./products.json')

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        //
     let record = await Product.create(jsonProducts)
        console.log('success')
        // console.log(record)
        const ee = await Product.find();
         console.log(ee)
        process.exit(0)
    } catch (error) {
        console.log("errrrrror", error)
        process.exit(1)
    }
}
start()