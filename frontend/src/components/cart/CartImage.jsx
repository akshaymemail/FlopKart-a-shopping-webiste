import React from 'react'

function CartImage(props) {
    return (
        <div>
            <img 
                src={props.url} 
                alt={props.alt} 
                className='small'
            />
        </div>
    )
}

export default CartImage
