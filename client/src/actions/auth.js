import axios from 'axios';
import { setAlert } from './alert';
import { ADD_ADMIN, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, URL } from './types';
import setAuthToken from '../utils/setAuthToken';


//Add Admin
export const register = ({name, email, password, role, addedBy, addedDate, status}, history) => async dispatch => {
    const config = {
        headers: {
            'content-Type': 'application/json',
        }
    }

    const body = JSON.stringify({ name, email, password, role, addedBy, addedDate, status });

    try{
        const res = await axios.post(URL + 'api/admin', body, config);

        dispatch({
            type: ADD_ADMIN,
            payload: res.data
        });
        dispatch(setAlert('New Admin Created', 'success'));
        history.push('/ManageAdmins');
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }    

    }
}


// Login User
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try{
        const res = await axios.post(URL + 'api/auth', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch( loadUser() );
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

// Load User
export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    try{
        const res = await axios.get(URL + 'api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data 
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }

};

// LOGOUT

export const logout = () => dispatch => {
    dispatch({ type: LOGOUT })
}