import {productDetailReducer} from './products/productDetails/productDetailReducers'
import {combineReducers} from 'redux'
import {productReducer} from './products/productReducers'
import {cartReducer} from './cart/cartReducers'
import { userRegisterReducer, userSignInReducer } from './user/userReducers'
import {orderDetailsReducer, orderPayReducer, orderReducer } from './order/orderReducers'

const reducer = combineReducers({
    products : productReducer,
    productDetails : productDetailReducer,
    cart : cartReducer,
    signIn : userSignInReducer,
    register : userRegisterReducer,
    order : orderReducer,
    orderDetails : orderDetailsReducer,
    orderPay : orderPayReducer
})

export default reducer