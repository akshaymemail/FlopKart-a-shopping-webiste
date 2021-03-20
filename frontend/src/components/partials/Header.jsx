import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logout from '../user/Logout';
function Header (){
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    const signIn = useSelector(state => state.signIn)
    const { userInfo } = signIn
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
                {
                    userInfo 
                    ? (<Logout firstName={userInfo.firstName} />) 
                    : (<Link to="/signin">Signin</Link>)
                }
            </div>
        </header>
    );
}
export default Header