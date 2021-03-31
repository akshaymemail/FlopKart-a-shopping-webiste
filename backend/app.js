import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import mongoose from 'mongoose'
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import orderRouter from './routers/orderRouter.js';
import { isAuth } from './utils/config.js';

const app = express();

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended : true}))

// constants
const PORT = process.env.PORT || 5000

// connecting to the mongodb
mongoose.connect(process.env.MONGODB_URI||process.env.DB_STRING,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true
})

// Routers
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname,"/frontend/build", "index.html"))
})

app.get('/api/payment/method/paypal',isAuth, (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID)
})

// check if app is on production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('frontend/build'))
}

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
});