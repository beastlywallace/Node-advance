const mongoose=require('mongoose')

const connectDB = (url) => {
    return mongoose.connect(url, {
        useNeUrlParser: true,
        useCreateIndex: true,
        useFindAnModify: false,
        useUnifiedTopology: true
    })
}
module.exports= connectDB