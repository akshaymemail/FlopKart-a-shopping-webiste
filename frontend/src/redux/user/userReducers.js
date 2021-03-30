import { USER_LOGOUT, USER_PROFILE_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS } from "./userTypes"

const initialState = {
    loading: false,
    userInfo : localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    error : ''
}

//REGISTER REDUCER
export const userRegisterReducer = (state = initialState, action) => {
    switch(action.type){
        case USER_REGISTER_REQUEST :  return {
            loading : true
        }
        case USER_REGISTER_SUCCESS : return {
            loading : false,
            userInfo : action.payload,
        }
        case USER_REGISTER_FAIL : return {
            loading : false,
            error : action.payload
        }
        default : return state
    }
}

// SIGNIN REDUCER
export const userSignInReducer = (state = initialState, action) => {
    switch(action.type){
        case USER_SIGNIN_REQUEST :  return {
            loading : true
        }
        case USER_SIGNIN_SUCCESS : return {
            loading : false,
            userInfo : action.payload,
        }
        case USER_SIGNIN_FAIL : return {
            loading : false,
            error : action.payload
        }
        case USER_LOGOUT : return {}
        default : return state
    }
}

// USER PROFILE REDUCERS
export const userProfileReducer = (state = {user:{}, loading : true, error: ''}, action) => {
    switch(action.type) {
        case USER_PROFILE_REQUEST : return {
            loading : true
        }
        case USER_PROFILE_SUCCESS : return {
            loading : false,
            user : action.payload
        }
        case USER_PROFILE_FAIL : return {
            loading : false,
            error : action.payload
        }
        default : return state
    }
}