import Axios from 'axios'
import {
    USER_LOGOUT,
    USER_PROFILE_FAIL,
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS
} from "./userTypes"

// REGISTER
export const userRegister = (firstName, lastName, email, password) => async (dispatch) => {
    dispatch({
        type: USER_REGISTER_REQUEST,
        payload: {
            firstName,
            lastName,
            email,
            password
        }
    })
    try {
        const {data} = await Axios.post('/api/users/register', {firstName,lastName,email, password})
        dispatch({
            type : USER_REGISTER_SUCCESS,
            payload : data
        })
        dispatch({
            type : USER_SIGNIN_SUCCESS,
            payload : data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

// SIGNIN
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
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

//LOGOUT
export const logOut = () => (dispatch) =>{
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    dispatch({type : USER_LOGOUT})
}

// USER PROFILE_SCREEN
export const userProfileAction = () => (dispatch, getState) => {
    dispatch({type : USER_PROFILE_REQUEST})
    const {signIn : {userInfo}} = getState()
    Axios.get(`/api/users/${userInfo ? userInfo._id : ''}`, {
        headers: {
            authorization : `Baerer ${userInfo ? userInfo.token : ''}`
        }
    }).then(response => {
        dispatch({type : USER_PROFILE_SUCCESS, payload : response.data})
    }).catch(error => {
        dispatch({type : USER_PROFILE_FAIL, payload : error.response && error.response.data.message ? error.response.data.message : error.message})
    })
}