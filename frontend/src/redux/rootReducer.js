import {productDetailReducer} from './products/productDetails/productDetailReducers'
import {combineReducers} from 'redux'
import {productReducer} from './products/productReducers'
import {cartReducer} from './cart/cartReducers'
import { updateProfileReducer, userProfileReducer, userRegisterReducer, userSignInReducer } from './user/userReducers'
import {orderDetailsReducer, orderHistoryReducer, orderPayReducer, orderReducer } from './order/orderReducers'

const reducer = combineReducers({
    products : productReducer,
    productDetails : productDetailReducer,
    cart : cartReducer,
    signIn : userSignInReducer,
    register : userRegisterReducer,
    order : orderReducer,
    orderDetails : orderDetailsReducer,
    orderPay : orderPayReducer,
    orderHistory : orderHistoryReducer,
    userProfile : userProfileReducer,
    updateProfile : updateProfileReducer
})

export default reducer