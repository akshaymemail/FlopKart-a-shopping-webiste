import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
function Header (){
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart
    return (
        <header className="row">
            <div>
                <Link className="brand" to="/"> FlopKart </Link>
            </div>
            <div>
                <Link to="/cart">Cart
                {
                    cartItems.length > 0 && (
                        <span className='badge' >{cartItems.length}</span>
                    )
                }
                </Link>
                <Link to="/signin">Signin</Link>
            </div>
        </header>
    );
}
export default Header