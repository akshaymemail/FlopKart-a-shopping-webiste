import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/cart/cartActions'

function CartSelect(props) {
    const dispatch = useDispatch()
    return (
        <div>
            <select 
                name="quantity" 
                id="quantity" 
                value={props.quantity} 
                onChange={e => 
                dispatch(addToCart( props.product, Number(e.target.value) ))}>
            
                {
                    [...Array(props.countInStock).keys()].map( x => <option key={x + 1} value = {x + 1}> {x + 1} </option>)
                } 
            
            </select>
        </div>
    )
}

export default CartSelect
