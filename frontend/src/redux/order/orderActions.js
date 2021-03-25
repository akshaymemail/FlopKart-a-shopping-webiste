import Axios from 'axios'
import { EMPTY_CART } from '../cart/cartTypes'
import {
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
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