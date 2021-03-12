import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAILURE } from "./productTypes"

const initialState = {
    loading : true,
    products : [],
    error : ''
}

export const productReducer = (state = initialState, action) => {
    switch(action.type){
        case PRODUCT_LIST_REQUEST : return {
            ...state,
            loading : state.loading = true
        }
        case PRODUCT_LIST_SUCCESS : return {
            ...state,
            loading : false,
            products : state.products = action.payload
        }
        case PRODUCT_LIST_FAILURE : return {
            ...state,
            loading : false,
            error : state.error = action.payload
        }
        default : return state
    }
}

