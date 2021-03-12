import Axios from 'axios'
import {PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAILURE} from './productTypes'

export const listProducts = () => async dispatch => {
    dispatch({
        type : PRODUCT_LIST_REQUEST
    })

    try {
        const { data } = await Axios.get('/api/products')
        dispatch({type : PRODUCT_LIST_SUCCESS, payload : data})
    } catch (error) {
        dispatch({type : PRODUCT_LIST_FAILURE, payload : error.message})
    }
}