import mongoose from 'mongoose'

//creating product schema
const productSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    brand : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    countInStock : {
        type : Number,
        required : true
    },
    rating : {
        type : Number,
        required : true
    },
    numReview : {
        type : Number,
        required : true
    }
}, {timestamps : true})

//creating product model
const Product = mongoose.model('Product',productSchema)

export default Product