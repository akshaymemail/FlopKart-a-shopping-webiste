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

// payment success route
orderRouter.put('/:id/pay', isAuth, (req, res) => {
    Order.findById(req.params.id, (err, foundOrder) => {
        if(!err) {
            if(foundOrder){
                // order found
                foundOrder.isPaid = true
                foundOrder.paidAt = Date.now()
                
                // save some payment result from paypal response
                foundOrder.paymentResult = {
                    id : req.body.id,
                    status : req.body.status,
                    update_time : req.body.update_time,
                    email_address : req.body.email_address
                }
                // now save the order to update order model
                Order.save((err, updatedOrder) => {
                    if(!err){
                        // succesfully save
                        res.send({message : "Order Paid", order : updatedOrder})
                    } else {
                        // there was an error
                        res.status(404).send({message : err.message})
                    }
                })

            }else {
                // order not found
                res.status(404).send({message : "Order not found"})
            }
        }else {
            res.status(502).send({message : err.message})
        }
    })
})

export default orderRouter