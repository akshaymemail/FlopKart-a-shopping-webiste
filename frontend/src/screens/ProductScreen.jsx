import React from 'react'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import data from '../data'

function ProductScreen (props) {
const product = data.products.find(product => product.id === props.match.params.id)

if(!product){
return <div>Product Not Found</div>
}else{
return (
<div>
    <Link to='/'>Go Back</Link>
    <div className="row top">
        <div className="col-2">
            <img className='large' src={product.image} alt={product.image} />
        </div>

        <div className="col-1">
            <ul>
                <li>Product: {product.name}</li>
                <li>Rating: {product.rating}
                    <Rating rating={product.rating} review={product.numReview} />
                </li>
                <li>Price: {product.price}</li>
                <li>Description: {product.description}</li>
            </ul>
        </div>
        <div className="col-1">
            <div className="card card-body">
                <ul>
                    <li>
                        <div className="row">
                            <div>Price</div>
                            <div className="price">
                                {product.price}
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="row">
                            <div>Status</div>
                            <div>
                                {product.countInStock > 0
                                ? <span className='success'>In Stock</span>
                                : <span className='error'>Unavailable</span>
                                }
                            </div>
                        </div>
                    </li>

                    <li>
                        <button className="primary block">
                            Add to cart
                        </button>
                    </li>

                </ul>
            </div>
        </div>
    </div>
</div>
)
}
}

export default ProductScreen