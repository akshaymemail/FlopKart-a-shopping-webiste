import {createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducer from './rootReducer'

const store = createStore (reducer,composeWithDevTools(applyMiddleware(thunk)))

export default store