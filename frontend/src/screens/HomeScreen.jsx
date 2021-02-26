import React from 'react'
import ProductCard from '../components/ProductCard'
import data from '../data';
function HomeScreen(){
    return (
        <div className="row center">
               {data.products.map((product) => 
                   <ProductCard product = {product} key={product.id}/>
                 )}  
        </div>
    )
}

export default HomeScreen