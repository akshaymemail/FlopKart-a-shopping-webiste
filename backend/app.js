import express from 'express';
import data from './data.js'

const app = express();

// constants
const PORT = 5000 || process.env.PORT

app.get('/', (req, res) =>{
    res.send("Node is here")
})

app.get('/api/products', (req, res) =>{
    res.send(data.products)
})

app.get('/api/products/:id', (req, res) => {
    const product = data.products.find(x => x.id === req.params.id)
    // check if proudct is exist or not 
    if(product){
        res.send(product)
    }else{
        res.status(404).send({message : `Product Not Found`})
    }
})

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
});