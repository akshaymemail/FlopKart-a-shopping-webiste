import React from 'react'
import { Link } from 'react-router-dom'
import MessageBox from '../MessageBox'

function EmptyCart() {
    return (
        <div className='center vertical-center'>
            <MessageBox>
                <h3>Your cart is empty!</h3>
                <Link to="/" className='shop-now' >Shop Now</Link>
            </MessageBox>
        </div>
    )
}

export default EmptyCart
