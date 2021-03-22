import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutStep from '../components/CheckoutStep'
import { saveShippingAddress } from '../redux/cart/cartActions'

function ShippingAddressScreen(props) {
    const signIn = useSelector(state => state.signIn)
    const {userInfo} = signIn
    // redirect to signin if user is logged out
    if(!userInfo){
        props.history.push('/signin')
    }
    // get address information from redux to filled data that is alread saved in localstorage
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const [fullName, setFullName] = useState(shippingAddress.fullName)
    const [mobileNumber, setMobileNumber] = useState(shippingAddress.mobileNumber)
    const [pinCode, setPinCode] = useState(shippingAddress.pinCode)
    const [locality, setLocality] = useState(shippingAddress.locality)
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [state, setState] = useState(shippingAddress.state)
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
        // dispatching address details to save address
        dispatch(saveShippingAddress({fullName, mobileNumber, pinCode, locality, address, city, state}))
        props.history.push('/payment')
    }
    return (
        <div>
            <CheckoutStep step1 step2 ></CheckoutStep>
            <form className='form' onSubmit={handleSubmit} >
                <h1>Shipping Address</h1>
                <div>
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" name='fullName' id='fullName' value={fullName} onChange={ e => setFullName(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="mobileNumber">Mobile Number</label>
                    <input type="tel" name='mobileNumber' id='mobileNumber' value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="pinCode">Pin Code</label>
                    <input type="text" name='pinCode' id='pinCode' value={pinCode} onChange={e => setPinCode(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="locality">Locality</label>
                    <input type="text" name='locality' id='locality' value={locality} onChange={e => setLocality(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <textarea name="address" id="address" cols="30" rows="3" value={address} onChange={ e => setAddress(e.target.value)}></textarea>
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input type="text" name='city' id='city' value={city} onChange={e => setCity(e.target.value)} required/>
                </div>
                <div>
                    <label htmlFor="state">State</label>
                    <input type="text" name='state' id='state' value={state} onChange={e => setState(e.target.value)} required/>
                </div>
                <button type="submit">Payment</button>
            </form>
        </div>
    )
}

export default ShippingAddressScreen
