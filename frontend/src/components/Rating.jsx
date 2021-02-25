import React from 'react'
import Star from './Star'

function Rating (props) {
const {rating, review} = props
return (
<div className="raiting">
    <Star rating={rating} number = {1} half = {0.5} />
    <Star rating={rating} number = {2} half = {1.5} />
    <Star rating={rating} number = {3} half = {2.5} />
    <Star rating={rating} number = {4} half = {3.5} />
    <Star rating={rating} number = {5} half = {4.5} />
    <span>{` ${review} reviews`}</span>
</div>
)
}

export default Rating