import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartRow from '../components/cart/CartRow'
import Checkout from '../components/cart/Checkout'
import EmptyCart from '../components/cart/EmptyCart'
import { addToCart } from '../redux/cart/cartActions'

function CartScreen(props) {
    const productId = props.match.params.id
    const quantity = props.location.search ? Number(props.location.search.split('=')[1]) : 1
    const dispatch = useDispatch()
    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, quantity))
        }
    }, [dispatch, productId, quantity])

    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

    return (
            cartItems.length === 0 
            ? <EmptyCart />
            : <div className="row top">
            <div className="col-2">
                <CartRow cartItems={cartItems} />
            </div>
            {cartItems.length > 0 && (
                <Checkout cartItems={cartItems} history ={props.history} />
            )}
        </div> 
    )
}

export default CartScreen
