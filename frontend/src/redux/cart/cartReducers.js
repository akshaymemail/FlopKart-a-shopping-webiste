import { ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART, SAVE_PAYMENT_METHOD, SAVE_SHIPPING_ADDRESS } from "./cartTypes"

const initialState = {
    cartItems : localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    shippingAddress : localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {},
    paymentMethod : null
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
        case SAVE_SHIPPING_ADDRESS : return {
            ...state,
            shippingAddress : action.payload
        }
        case SAVE_PAYMENT_METHOD : return {
            ...state,
            paymentMethod : action.payload
        }
        case EMPTY_CART : return {
            ...state,
            cartItems : []
        }
        default: return state
    }
}