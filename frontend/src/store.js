import { applyMiddleware, combineReducers, createStore } from 'redux';

import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import { productDetailsReducer, productReducer } from './reducers/productReducer';
import { userReducer } from './reducers/userReducer';

// reducer
const reducer = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    user: userReducer
});

// initial state
const initialState = {};

// middleware
const middleware = [thunk];

// store

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
