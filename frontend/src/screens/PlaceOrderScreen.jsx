import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import CartImage from '../components/cart/CartImage'
import CheckoutStep from '../components/CheckoutStep'
import MessageBox from '../components/MessageBox'
import { createOrder } from '../redux/order/orderActions'
import { CREATE_ORDER_RESET } from '../redux/order/orderTypes'
import { orderDetails } from '../redux/orderDetails/orderDetailActions'

function PlaceOrderScreen(props) {
    const cart = useSelector(state => state.cart)
    const signIn = useSelector(state => state.signIn)
    if(!cart.paymentMethod || !signIn.userInfo){
        props.history.push('/payment')
    }
    // ORDER
    const orderState = useSelector(state => state.order)
    const {loading, success, error, order} = orderState
    const {shippingAddress, paymentMethod, cartItems} = cart
    cart.items = cartItems.reduce((a, c) => a + c.quantity, 0)
    cart.itemPrice = cartItems.reduce((a, c) => a + c.quantity * c.price , 0)
    // charge rs 40 if user shooping under 199 rs
    cart.shippingPrice = cart.itemPrice > 199 ? 0 : 40
    // total Price
    cart.totalPrice = (cart.itemPrice + cart.shippingPrice)
    // dispatch ref...
    const dispatch = useDispatch()
    // HANDLE PLACE ORDER
    function handlePlaceOrder(e){
        e.preventDefault()
        dispatch(createOrder({...cart, orderItems : cartItems}))
    }
    useEffect(() => {
        if(success){
            dispatch({type : CREATE_ORDER_RESET})
            props.history.push(`/orders/${order._id}`)
            dispatch(orderDetails(order._id))
        }
    }, [dispatch, order, props.history, success])

    return (
        <div>
            <CheckoutStep step1 step2 step3 step4></CheckoutStep>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className='card card-body'>
                            <h2> <strong>Shipping Address</strong> </h2>
                                <p>
                                    <strong>Name :</strong> {shippingAddress.fullName} <br/>
                                    <strong>Address : </strong>
                                    {shippingAddress.address}, 
                                    {shippingAddress.locality}, 
                                    {shippingAddress.city}, 
                                    {shippingAddress.state}, 
                                    {shippingAddress.pinCode} <br/>
                                    <strong>Mobile : </strong> {shippingAddress.mobileNumber}
                                </p>
                            </div>
                        </li>
                        
                        <li>
                            <div className='card card-body'>
                            <h2> <strong>Payment Method</strong> </h2>
                                <p>
                                    <strong>Payment :</strong> {paymentMethod} <br/>
                                </p>
                            </div>
                        </li>

                        <li>
                            <div className='card card-body'>
                                <h2> <strong>Order Details</strong> </h2>
                                <ul>
                                    {
                                        cartItems.map(item => (
                                            <li key={item.id}>
                                                <div className="row">
                                                    <CartImage url={item.image} alt={item.name} />
                                                    <div className='min-30'>
                                                        <Link to={`/product/${item.product}`} > <abbr title={item.name}>{item.name.substring(0, 10)+'...'}</abbr></Link>
                                                    </div>            
                                                    <div> {item.quantity} x Rs {item.price} = Rs {item.quantity * item.price}</div>
                                                </div>  {/*row div end */}
                                            </li>  
                                        ))
                                    }
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2><strong>Order Summary</strong></h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Items ({cart.items})</div>
                                    <div>Rs {cart.itemPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Shipping fee</div>
                                    <div>Rs {cart.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Total Price</strong></div>
                                    <div><strong>Rs {cart.totalPrice.toFixed(2)}</strong></div>
                                </div>
                            </li>
                            <li>
                                <button type="submit" onClick={handlePlaceOrder} disabled ={cartItems.length === 0}>
                                    {loading ? <i className="fa fa-spinner fa-spin button-loading"></i> : <i>Place Order</i> } 
                                </button>
                               
                            </li>
                            {error && <MessageBox variant={'error'}>{error}</MessageBox>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrderScreen
