import express from 'express'
import Order from '../models/orderModel.js';
import { isAuth } from '../utils/config.js';

// create router
const orderRouter = express.Router()

// create post router
orderRouter.post('/', isAuth, (req, res) => {
    if(req.body.orderItems.length === 0){
        // cart is empty
        res.status(400).send({message: 'Cart is empty'});
    }else {
        // there is some items in the cart
        new Order({
            orderItems : req.body.orderItems,
            shippingAddress : req.body.shippingAddress,
            paymentMethod : req.body.paymentMethod,
            itemPrice : req.body.itemPrice,
            shippingPrice : req.body.shippingPrice,
            totalPrice : req.body.totalPrice,
            user : req.user._id
        }).save((err, createdOrder)=> {
            if(!err){
                res.status(201).send({message : 'New order created', order : createdOrder})
            } else {
                console.log(err)
                res.status(503).send({Error : err.message})
            }
        })
    }
})

// get data by _id
orderRouter.get('/:id', isAuth, (req, res) => {
    Order.findById(req.params.id, (err, foundOrder) => {
        if(!err){
            // Order found succesfully
            res.send(foundOrder)
        }else {
            // order not found
            res.status(404).send({Error : "Item Not Found"})
        }
    })
})

export default orderRouter