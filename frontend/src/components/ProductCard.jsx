import React from 'react'
import Rating from './Rating'

function ProductCard (props) {
    const {product} = props
    return (
        <div className="card">
            <a href="product.html">
                <img className="medium" src={product.image} alt={product.name}></img>
            </a>
            <div className="card-body">
                <a href="product.html">
                    <h2>{product.name}</h2>
                </a>
                <Rating rating = {product.rating} review = {product.numReview} />
                <div className="price">
                    <p>Rs {product.price}</p>
                </div>
            </div>
        </div>
    );
}

export default ProductCard