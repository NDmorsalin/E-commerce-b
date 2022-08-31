/* eslint-disable import/prefer-default-export */
/* eslint-disable default-param-last */
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

export const userReducer = (state = { user: [] }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_USER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticate: false
            };
        case LOGIN_SUCCESS:
        case REGISTER_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticate: true,
                user: action.payload
            };
        case LOGIN_FAIL:
        case REGISTER_USER_FAIL:
        case LOAD_USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticate: false,
                user: null,
                error: action.payload
            };
        case LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticate: false,
                user: null
            };
        case LOGOUT_FAIL:
            return {
                ...state,
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
