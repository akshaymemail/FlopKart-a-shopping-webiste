import {productDetailReducer} from './products/productDetails/productDetailReducers'
import {combineReducers} from 'redux'
import {productReducer} from './products/productReducers'

const reducer = combineReducers({
    products : productReducer,
    productDetails : productDetailReducer
})

export default reducer