/* eslint-disable default-param-last */
import axios from 'axios';
import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    CLEAR_ERROR,
    PRODUCT_FAIL,
    PRODUCT_REQUEST,
    PRODUCT_SUCCESS
} from '../constant/productConstant';

export const getAllProduct =
    (keyword, activePage = 1) =>
    async (dispatch) => {
        try {
            dispatch({
                type: ALL_PRODUCT_REQUEST
            });

            const link =
                (keyword && `/api/v1/products?keyword=${keyword}&&page=${activePage}`) ||
                `/api/v1/products?page=${activePage}`;
            // const link = `/api/v1/products?keyword=${keyword}`;
            const { data } = await axios.get(link);
            dispatch({
                type: ALL_PRODUCT_SUCCESS,
                payload: data
            });
        } catch (err) {
            console.log(err);
            dispatch({
                type: ALL_PRODUCT_FAIL,
                payload: err.response
            });
        }
    };

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_REQUEST
        });

        const { data } = await axios.get(`/api/v1/product/${id}`);

        dispatch({
            type: PRODUCT_SUCCESS,
            payload: data.product
        });
    } catch (err) {
        console.log(err.response.data);
        dispatch({
            type: PRODUCT_FAIL,
            payload: err.response.data
        });
    }
};

export const clearError = () => (dispatch) => {
    dispatch({
        type: CLEAR_ERROR,
        error: null
    });
};
