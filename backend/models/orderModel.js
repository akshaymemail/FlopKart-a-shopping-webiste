import mongoose from 'mongoose'

// creating order schema
const orderSchema = mongoose.Schema({
    // PRODUCTS
    orderItems: [{
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        }
    }],

    // ADDRESS
    shippingAddress : {
        fullName:{type: String, required: true},
        mobileNumber:{type: String, required : true},
        locality : {type: String, required : true},
        address : {type: String, required : true},
        city : {type: String, required : true},
        state : {type: String, required : true},
        pinCode : {type: String, required : true}
    },

    //PAYMENT METHODS
    paymentMethod : {type: String, required :true},

    // PRICE
    itemPrice : {type: Number, required : true},
    shippingPrice : {type: Number, required : true},
    totalPrice : {type: Number, required : true},

    // USER
    user : {type: mongoose.Schema.Types.ObjectId, ref: 'User', required : true},
    isPaid : {type : Boolean, default: false},
    paidAt : {type: Date},
    isDelivered : {type: Boolean, default: false},
    deliveredAt : {type: Date},
},{timestamps : true})

// creating model
const Order = mongoose.model('Order', orderSchema)
// export Order as default
export default Order