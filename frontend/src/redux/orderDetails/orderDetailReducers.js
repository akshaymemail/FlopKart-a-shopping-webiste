import { ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from "./orderDetailTypes"

const initialState = {
    loading : false,
    orderData : {},
    error : ''
}

export const  orderDetailsReducer = (state = initialState, action) => {
    switch(action.type){
        case  ORDER_DETAILS_REQUEST :  return {
            loading : true
        }
        case ORDER_DETAILS_SUCCESS: return {
            loading : false,
            orderData : action.payload
        }
        case ORDER_DETAILS_FAIL : return {
            loading : false,
            error : action.payload
        }
        default : return state
    }
}