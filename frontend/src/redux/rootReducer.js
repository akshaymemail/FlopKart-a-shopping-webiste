import {productDetailReducer} from './products/productDetails/productDetailReducers'
import {combineReducers} from 'redux'
import {productReducer} from './products/productReducers'
import {cartReducer} from './cart/cartReducers'

const reducer = combineReducers({
    products : productReducer,
    productDetails : productDetailReducer,
    cart : cartReducer
})

export default reducer