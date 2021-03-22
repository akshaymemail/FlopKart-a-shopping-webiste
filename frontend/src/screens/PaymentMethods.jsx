import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutStep from '../components/CheckoutStep'
import { savePaymentMethod } from '../redux/cart/cartActions'

function PaymentMethods(props) {
    // redirect user to shipping address if address not found
    const cart = useSelector(state => state.cart)
    const signIn = useSelector(state => state.signIn)
    const {shippingAddress} = cart
    const {userInfo} = signIn
    if(!shippingAddress.address || !userInfo){
        props.history.push('/shipping')
    }
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const dispatch = useDispatch()
    function handleSubmit(e) {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        props.history.push('/placeorder')
    }
    return (
        <div>
            <CheckoutStep step1 step2 step3></CheckoutStep>
            <form className='form' onSubmit={handleSubmit} >
                <div>
                    <h1>Select Payment Method</h1>
                </div>
                <div>
                    <div>
                        <input type="radio" name="paymentMethod" id="paypal" value='PayPal' onChange={ e => setPaymentMethod(e.target.value)} checked required />
                        <label htmlFor="paypal">PayPal</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="radio" name="paymentMethod" id="stripe" value='Stripe' onChange={ e => setPaymentMethod(e.target.value)} required />
                        <label htmlFor="stripe">Stripe</label>
                    </div>
                </div>
                <button type="submit">Payment</button>
            </form>
        </div>
    )
}

export default PaymentMethods
