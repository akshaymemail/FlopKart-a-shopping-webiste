import React from 'react'
import { Link } from 'react-router-dom'
import CartImage from './CartImage'
import CartSelect from './CartSelect'
import Price from './Price'
import RemoveFromCart from './RemoveFromCart'

function CartRow(props) {
    return (
        <ul>
            {
                props.cartItems.map(item => (
                    <li>
                        <div className="row">
                            <CartImage url={item.image} alt={item.name} />
                            <div className='min-30'>
                                <Link to={`/product/${item.product}`} > <abbr title={item.name}>{item.name.substring(0, 10)+'...'}</abbr></Link>
                            </div>            
                            <CartSelect quantity={item.quantity} product={item.product} countInStock={item.countInStock} />
                            <Price item={item} />
                            <RemoveFromCart product={item.product} />
                        </div>  {/*row div end */}
                    </li>  
                ))
            }
        </ul>
    )
}

export default CartRow
