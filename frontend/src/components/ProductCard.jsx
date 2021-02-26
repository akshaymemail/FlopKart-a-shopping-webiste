import React from 'react'
import Rating from './Rating'

function ProductCard (props) {
    const {product} = props
    return (
        <div className="card">
            <a href = {`product/${product.id}`}>
                <img className="medium" src={product.image} alt={product.name}></img>
            </a>
            <div className="card-body">
                <a href={`product/${product.id}`}>
                    <h2>{product.name}</h2>
                </a>
                <Rating rating = {product.rating} review = {product.numReview} />
                <div className="price">
                    <p>Price : {product.price}</p>
                </div>
            </div>
        </div>
    );
}

export default ProductCard