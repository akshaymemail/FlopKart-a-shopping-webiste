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

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
});