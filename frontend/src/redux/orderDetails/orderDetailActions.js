import Axios from 'axios'
import { ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from './orderDetailTypes'

export const orderDetails = (orderId) => async (dispatch, getState) => {
    dispatch({type : ORDER_DETAILS_REQUEST, payload : orderId})
    try {
        const {signIn : {userInfo}} = getState()
        console.log(orderId)
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