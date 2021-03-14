import React from 'react'

function Checkout(props) {
    const checkoutHandler = () => {
        // handle checkout action
        props.history.push('/signin?redirect=shipping')
    }
    return (
        <div className="col-1">
            <div className="card card-body">
                <ul>
                    <li>
                        <h2>
                            SubTotal : ( {props.cartItems.reduce((a, c)=> a + c.quantity, 0)} items ) : Rs {props.cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                        </h2>
                    </li>
                    <li>
                        <button onClick={checkoutHandler} >Checkout Now</button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Checkout
