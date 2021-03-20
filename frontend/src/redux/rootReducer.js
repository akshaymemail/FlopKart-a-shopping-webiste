import {productDetailReducer} from './products/productDetails/productDetailReducers'
import {combineReducers} from 'redux'
import {productReducer} from './products/productReducers'
import {cartReducer} from './cart/cartReducers'
import { userSignInReducer } from './signin/signinReducers'

const reducer = combineReducers({
    products : productReducer,
    productDetails : productDetailReducer,
    cart : cartReducer,
    signIn : userSignInReducer
})

export default reducer