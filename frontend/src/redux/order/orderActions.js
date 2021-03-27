import Axios from 'axios'
import { EMPTY_CART } from '../cart/cartTypes'
import {
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
} from "./orderTypes"

export const createOrder = order => async (dispatch, getState) => {
    dispatch({
        type: CREATE_ORDER_REQUEST,
        payload: order
    })
    try {
        const {signIn : {userInfo}} = getState()
        const {data} = await Axios.post('/api/orders', order, {
            headers : {
                authorization : `Baerer ${userInfo.token}`
            }
        })
        dispatch({type : CREATE_ORDER_SUCCESS, payload : data.order})
        dispatch({type : EMPTY_CART})
        localStorage.removeItem('cartItems')
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

// ORDER DETAILS
export const orderDetails = (orderId) => async (dispatch, getState) => {
    dispatch({type : ORDER_DETAILS_REQUEST, payload : orderId})
    try {
        const {signIn : {userInfo}} = getState()
        const {data}  = await Axios.get(`/api/orders/${orderId}`, {
            headers : {
                authorization : `Baerer ${userInfo.token}`
            }
        })
        dispatch({type : ORDER_DETAILS_SUCCESS, payload : data})
    } catch (error) {
        dispatch({type : ORDER_DETAILS_FAIL, payload : error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}

// PAY ORDER ACTION
export const payOrder = (order, paymentResult) => async (dispatch, getState) => {
    dispatch({type : ORDER_PAY_REQUEST})
    try {
        const {signIn : {userInfo}} = getState()
        const {data} = await Axios.put(`/api/orders${order._id}`, paymentResult, {
            headers: {
                authorization : `Baerer ${userInfo.token}`
            }
        })
        dispatch({type : ORDER_PAY_SUCCESS , payload : data})
    } catch (error) {
        dispatch({type : ORDER_PAY_FAIL, payload : error.response && error.response.data.message ? error.response.data.message : error.message})
    }
}