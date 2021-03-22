import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import data from './data.js'
import mongoose from 'mongoose'
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';

const app = express();

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended : true}))

// constants
const PORT = 5000 || process.env.PORT

// connecting to the mongodb
mongoose.connect(process.env.DB_STRING,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true
})

// Routers
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)

app.get('/', (req, res) =>{
    res.send("Node is here")
})


app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
});