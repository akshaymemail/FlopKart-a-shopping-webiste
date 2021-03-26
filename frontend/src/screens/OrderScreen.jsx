import { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import CartImage from '../components/cart/CartImage'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { orderDetails } from '../redux/orderDetails/orderDetailActions'
import {PayPalButton} from 'react-paypal-button-v2'
import Axios from 'axios'

function OrderScreen(props) {
    const orderId = props.match.params.id
    const currency = 'INR';
    const orderState = useSelector(state => state.orderDetails)
    const {loading,success, orderData, error} = orderState

    // sdkReady
    const [sdkReady, setSdkReady] = useState(false)
    const [clientId, setClientId] = useState('sb')

    // get user info for token
    const {userInfo} = useSelector(state => state.signIn)
    
    const dispatch = useDispatch()

    useEffect(() => {
        Axios.get('/api/payment/method/paypal', {
            headers : {
                authorization : `Baerer ${userInfo.token}`
            }
        }).then(response => {
            setSdkReady(true)
            setClientId(response.data)
        }).catch(error => {
            console.log(error)
        })
        dispatch(orderDetails(orderId))
        
    }, [dispatch, orderId, userInfo.token])

    function successPaymentHandler() {
        alert('payment Recived')
    }

    return loading 
    ? <LoadingBox></LoadingBox>
    : error ? <MessageBox variant={'error'}>{error}</MessageBox> 
    : success && (
        <div>
        <h2>Order : {orderData._id}</h2>
        <div className="row top">
            <div className="col-2">
                <ul>
                    <li>
                        <div className='card card-body'>
                        <h2> <strong>Shipping Address</strong> </h2>
                            <p>
                                <strong>Name :</strong> {orderData.shippingAddress.fullName} <br/>
                                <strong>Address : </strong>
                                {orderData.shippingAddress.address}, 
                                {orderData.shippingAddress.locality}, 
                                {orderData.shippingAddress.city}, 
                                {orderData.shippingAddress.state}, 
                                {orderData.shippingAddress.pinCode} <br/>
                                <strong>Mobile : </strong> {orderData.shippingAddress.mobileNumber}
                            </p>
                            {orderData.isDelivered 
                                ? <MessageBox variant={'success'}>Order Delivered</MessageBox>
                                : <MessageBox variant={'warning'}>Not Delivered</MessageBox>
                            }
                        </div>
                    </li>
                    
                    <li>
                        <div className='card card-body'>
                        <h2> <strong>Payment Method</strong> </h2>
                            <p>
                                <strong>Payment :</strong> {orderData.paymentMethod} <br/>
                            </p>
                            {orderData.isPaid 
                                ? <MessageBox variant={'success'}>Paid</MessageBox>
                                : <MessageBox variant={'warning'}>Not Paid</MessageBox>
                            }
                        </div>
                    </li>

                    <li>
                        <div className='card card-body'>
                            <h2> <strong>Order Details</strong> </h2>
                            <ul>
                                {
                                    orderData.orderItems.map(item => (
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
                                <div>Items ({orderData.orderItems.length})</div>
                                <div>Rs {orderData.itemPrice.toFixed(2)}</div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div>Shipping fee</div>
                                <div>Rs {orderData.shippingPrice.toFixed(2)}</div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                                <div><strong>Total Price</strong></div>
                                <div><strong>Rs {orderData.totalPrice.toFixed(2)}</strong></div>
                            </div>
                        </li>

                        {
                            !orderData.isPaid 
                            &&sdkReady 
                            &&(
                                <li>
                                    <PayPalButton 
                                        amount={orderData.totalPrice} 
                                        currency={currency}
                                        options = {{
                                            currency : currency.toUpperCase(),
                                            clientId : clientId
                                        }}
                                        onSuccess={successPaymentHandler}
                                    />
                                </li>
                            )
                        }

                    </ul>
                </div>
            </div>
        </div>
    </div> 
    )
}

export default OrderScreen
