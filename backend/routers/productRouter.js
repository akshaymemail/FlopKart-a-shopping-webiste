import express from 'express'
import data from '../data.js'
import Product from '../models/productModel.js'

const productRouter = express.Router()

// sending all products to frontend
productRouter.get('/', (req, res) => {
    Product.find({} , (err, foundProducts) => {
        if(!err){
            // products found now send to the frontend
            res.send(foundProducts)
        }else {
            // there was an error
            res.status(404).send({Error : err.message})
        }
    })
})

// creating products in the mongodb using pussy api
productRouter.get('/pussy', (req, res) => {
    Product.insertMany(data.products, (err, products) => {
        if(!err){
            // products succesfully added to the database
            res.send({createdProducts : products})
        } else {
            // there was an error inserting products in the database
            res.status(500).send({Error : err.message})
        }
    })
})

// finding a specific product
productRouter.get('/:id', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) => {
        if(!err){
            res.send(foundProduct)
        }else{
            res.status(404).send({Error : err.message})
        }
    })
})

export default productRouter