import {PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAILURE} from './productDetailTypes'

const initialState = {
    loading : true,
    productDetails : [],
    error : ''
}
export const productDetailReducer = (state = initialState , action) => {
    switch(action.type){
        case PRODUCT_DETAIL_REQUEST :  return {
            loading : true
        }
        case PRODUCT_DETAIL_SUCCESS : return {
            loading : false,
            product : action.payload
        }
        case PRODUCT_DETAIL_FAILURE : return {
            loading : false,
            error : action.payload
        }
        default : return state
    }
}