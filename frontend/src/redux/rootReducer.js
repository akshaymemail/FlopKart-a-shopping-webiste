import {productDetailReducer} from './products/productDetails/productDetailReducers'
import {combineReducers} from 'redux'
import {productReducer} from './products/productReducers'
import {cartReducer} from './cart/cartReducers'
import { userRegisterReducer, userSignInReducer } from './user/userReducers'

const reducer = combineReducers({
    products : productReducer,
    productDetails : productDetailReducer,
    cart : cartReducer,
    signIn : userSignInReducer,
    register : userRegisterReducer
})

export default reducer