import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    firstName:{
        type : String,
        required : true
    },
    middleName : {
        type : String,
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true // to prevent duplicate email
    },
    password : {
        type : String,
        required : true
    },
    isAdmin : {
        type : Boolean,
        default : false,
        required : true

    }
},{timestamps : true})

const User = mongoose.model('User', userSchema)

export default User