import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import {useSelector, useDispatch} from 'react-redux'
import { detailsProduct } from '../redux/products/productDetails/productDetailActions'

function ProductScreen (props) {
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {loading, product, error} = productDetails

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id))
    }, [dispatch, props.match.params.id])

    return (

        <div> {
            (loading 
                ? (<LoadingBox></LoadingBox>)
                : error 
                ? (<MessageBox variant={'error'}>{error}</MessageBox>) 
                : <div>
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
                )} 
            </div>

    
)}

export default ProductScreen