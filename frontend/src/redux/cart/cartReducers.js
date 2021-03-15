import { ADD_TO_CART, REMOVE_FROM_CART } from "./cartTypes"

const initialState = {
    cartItems : localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
}
export const cartReducer = (state = initialState, action) => {
    switch (action.type){
         
        case ADD_TO_CART : 
        const item = action.payload
        const existing = state.cartItems.find(x => x.product === item.product)
        if(existing){
            return {
                ...state,
                cartItems: state.cartItems.map(x => x.product === existing.product ? item : x ),
            }
        } else {
            return {
                ...state,
                cartItems: [...state.cartItems, item],
            }
        }
        case REMOVE_FROM_CART : return {
            ...state,
            cartItems : state.cartItems.filter( x => x.product !== action.payload )
        }
        default: return state
    }
}