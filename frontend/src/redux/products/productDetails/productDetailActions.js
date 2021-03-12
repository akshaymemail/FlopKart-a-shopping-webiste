import {
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAILURE
} from './productDetailTypes'
import Axios from 'axios'
export const detailsProduct = (productId) => async dispatch => {
    dispatch({
        type: PRODUCT_DETAIL_REQUEST,
        payload: productId
    })

    try {
        const {
            data
        } = await Axios.get(`/api/products/${productId}`)
        dispatch({
            type: PRODUCT_DETAIL_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAIL_FAILURE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}