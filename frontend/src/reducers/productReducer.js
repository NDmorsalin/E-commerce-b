/* eslint-disable import/prefer-default-export */
/* eslint-disable default-param-last */
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    CLEAR_ERROR,
    PRODUCT_FAIL,
    PRODUCT_REQUEST,
    PRODUCT_SUCCESS
} from '../constant/productConstant';

export const productReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            };

        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resultPerPage: action.payload.resultPerPage
            };

        case ALL_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            };

        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            };

        default:
            return state;
    }
};
export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_REQUEST:
            return {
                loading: true,
                ...state
            };

        case PRODUCT_SUCCESS:
            return {
                loading: false,
                product: action.payload
            };

        case PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            };

        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            };

        default:
            return state;
    }
};
