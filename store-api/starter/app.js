require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()

const connectDB = require('./db/connect')
const productRouter = require('./routes/products')



const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

//middleware
app.use(express.json())

app.get('/', (req, res) => {
    res.send('<h1>Store Api</h1> <a href="/api/v1/products">products route</a>')


})


app.use('/api/v1/products', productRouter)
app.use(errorMiddleware)
app.use(notFoundMiddleware)
const port =process.env.PORT || 9000
const start = async () => {
    try {
        //conncet db
        await connectDB(process.env.MONGO_URL)
        app.listen(port, console.log(`server is listening port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}
start()