/* eslint-disable import/prefer-default-export */

import axios from 'axios';
import {
    CLEAR_ERROR,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    USER_FAIL,
    USER_REQUEST,
    USER_SUCCESS
} from '../constant/userConstant';

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: LOGIN_REQUEST
        });

        const link = `/api/v1/login`;
        const config = {
            headers: { 'Content-Type': 'application/json' }
        };

        const { data } = await axios.post(link, { email, password }, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: LOGIN_FAIL,
            payload: JSON.parse(error.request.response).error.common.msg
        });
    }
};

export const register = (reUser) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REQUEST
        });
        console.log({ reUser });
        const link = `/api/v1/register`;
        const config = {
            headers: { 'Content-Type': 'application/json' }
        };

        const { data } = await axios.post(link, { ...reUser }, config);
        console.log({ data });
        dispatch({
            type: USER_SUCCESS,
            payload: data.user
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: USER_FAIL,
            payload: error.request.response
        });
    }
};

export const clearError = () => (dispatch) => {
    dispatch({
        type: CLEAR_ERROR,
        error: null
    });
};
