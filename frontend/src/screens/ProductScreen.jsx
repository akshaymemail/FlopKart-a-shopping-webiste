import React, { useEffect, useState } from 'react'
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
    const [quantity, setQuantity ] = useState(1)

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id))
    }, [dispatch, props.match.params.id])

    const addToCardHandler = () => {
        props.history.push(`/cart/${props.match.params.id}?quantity=${quantity}`)
    }

    return (

        <div> {
            (loading 
                ? (<LoadingBox></LoadingBox>)
                : error 
                ? (<MessageBox variant={'error'}>{error.message}</MessageBox>) 
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
                                { product.countInStock > 0 && (
                                    <>
                                        <li>
                                            <div className="row">
                                                <div>Quantity</div>
                                                <div>
                                                    <select name='quantity' id="quantity" value = { quantity } onChange = { e => setQuantity(e.target.value)}>
                                                        {
                                                            [ ...Array( product.countInStock ).keys() ].map( x => <option key = { x + 1 } value = { x + 1 } > { x + 1 } </option> )
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <button onClick = { addToCardHandler } className="primary block"> Add to Cart </button>
                                        </li>
                                   </>
                                  )
                                }
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