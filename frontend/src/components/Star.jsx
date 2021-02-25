import React from 'react'

function Star(props){
    const {rating,number, half} = props
    return (
        <span className={ 
            rating>= number? "fa fa-star"
            :rating >= half
            ? "fa fa-star-half-o"
            : "fa fa-star-o"
            }
        ></span>
    )
}

export default Star