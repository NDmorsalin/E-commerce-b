/* eslint-disable import/prefer-default-export */

import axios from 'axios';
import {
    CLEAR_ERROR,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS
} from '../constant/userConstant';

// login
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

// signup
export const register = (reUser) => async (dispatch) => {
    try {
        dispatch({
            type: REGISTER_USER_REQUEST
        });
        console.log({ reUser });
        const link = `/api/v1/register`;
        const config = {
            headers: { 'Content-Type': 'application/json' }
        };

        const { data } = await axios.post(link, { ...reUser }, config);
        console.log({ data });
        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.request.response
        });
    }
};

// load user
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: LOAD_USER_REQUEST
        });

        const link = `/api/v1/me`;

        const { data } = await axios.get(link);
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.request.response
        });
    }
};

// load user
export const logout = () => async (dispatch) => {
    try {
        const link = `/api/v1/logout`;

        await axios.get(link);
        dispatch({
            type: LOGOUT_SUCCESS
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: LOGOUT_FAIL,
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
