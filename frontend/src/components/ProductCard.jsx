import React from 'react'
import { Link } from 'react-router-dom';
import Rating from './Rating'

function ProductCard (props) {
    const {product} = props
    return (
        <div className="card">
            <Link to = {`product/${product.id}`}>
                <img className="medium" src={product.image} alt={product.name}></img>
            </Link>
            <div className="card-body">
                <Link to={`product/${product.id}`}>
                    <h2>{product.name}</h2>
                </Link>
                <Rating rating = {product.rating} review = {product.numReview} />
                <div className="price">
                    <p>Price : {product.price}</p>
                </div>
            </div>
        </div>
    );
}

export default ProductCard