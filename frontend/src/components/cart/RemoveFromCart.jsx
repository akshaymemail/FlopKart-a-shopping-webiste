import React from 'react'
import { useDispatch } from 'react-redux'
import { removeFromCart } from '../../redux/cart/cartActions'

function RemoveFromCart(props) {
    const dispatch = useDispatch()
    const removeFromCartHandler = (id) => {
        // handle delete action
        dispatch(removeFromCart(id))
    }
    return (
        <div>
            <button onClick={() => removeFromCartHandler(props.product)}>
                Delete
            </button>
        </div>
    )
}

export default RemoveFromCart
