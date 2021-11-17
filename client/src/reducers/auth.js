import {
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    ADD_ADMIN
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    admin: null
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type){
        case USER_LOADED:
            localStorage.setItem('role', payload.role);
            return{
                ...state,
                isAuthenticated: true,
                loading: false,
                admin: payload
            };

        case LOGIN_SUCCESS:    
            localStorage.setItem('token', payload.token);
            return{
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            };

        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT: 
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('_id');
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            };
        
        case ADD_ADMIN: 
            return{
                ...state,
                ...payload
            };

        default:
            return state;
    }
}