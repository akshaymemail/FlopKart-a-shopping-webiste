import Axios from 'axios'
import {
    USER_LOGOUT,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS
} from "./signinTypes"

export const userSignIn = (email, password) => async (dispatch) => {
    dispatch({
        type: USER_SIGNIN_REQUEST,
        payload: {
            email,
            password
        }
    })
    try {
        const {data} = await Axios.post('/api/users/signin', {email, password})
        dispatch({
            type : USER_SIGNIN_SUCCESS,
            payload : data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.responce && error.responce.data.message ? error.responce.data.message : error.message
        })
    }
}

export const logOut = () => (dispatch) =>{
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    dispatch({type : USER_LOGOUT})
}