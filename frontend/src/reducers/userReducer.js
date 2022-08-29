/* eslint-disable import/prefer-default-export */
/* eslint-disable default-param-last */
import {
    CLEAR_ERROR,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    USER_FAIL,
    USER_REQUEST,
    USER_SUCCESS
} from '../constant/userConstant';

export const userReducer = (state = { user: [] }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case USER_REQUEST:
            return {
                loading: true,
                isAuthenticate: false
            };
        case LOGIN_SUCCESS:
        case USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticate: true,
                user: action.payload
            };
        case LOGIN_FAIL:
        case USER_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticate: false,
                user: null,
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
