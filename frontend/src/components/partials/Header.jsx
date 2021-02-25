import React from 'react'
function Header (){
    return (
        <header className="row">
            <div>
                <a className="brand" href="/"> FlopKart </a>
            </div>
            <div>
                <a href="/cart">Your Cart</a>
                <a href="/signin">Signin</a>
            </div>
        </header>
    );
}
export default Header