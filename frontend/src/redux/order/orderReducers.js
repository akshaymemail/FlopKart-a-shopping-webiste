import { CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_RESET, CREATE_ORDER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS} from "./orderTypes"

const initialState = {
    loading : false,
    success : false,
    order : {},
    error : ''
}
export const orderReducer = (state = initialState, action) => {
    switch(action.type){
        case  CREATE_ORDER_REQUEST :  return {
            loading : true
        }
        case CREATE_ORDER_SUCCESS : return {
            loading : false,
            success : true,
            order : action.payload
        }
        case CREATE_ORDER_FAIL : return {
            loading : false,
            error : action.payload
        }
        case CREATE_ORDER_RESET : return {}
        default : return state
    }
}

// ORDER DETAILS
export const  orderDetailsReducer = (state = initialState, action) => {
    switch(action.type){
        case  ORDER_DETAILS_REQUEST :  return {
            loading : true
        }
        case ORDER_DETAILS_SUCCESS: return {
            loading : false,
            orderData : action.payload,
            success : true
        }
        case ORDER_DETAILS_FAIL : return {
            loading : false,
            error : action.payload
        }
        default : return state
    }
}

// ORDER PAY REDUCER
export const orderPayReducer = (state = initialState, action) => {
    switch(action.type){
        case ORDER_PAY_REQUEST : return {
            loading : true
        }
        case ORDER_PAY_SUCCESS : return {
            loading : false,
            success : true
        }
        case ORDER_PAY_FAIL : return {
            loading : false,
            error : action.payload
        }
        default : return state
    }
}