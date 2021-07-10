import axios from 'axios';
import { setAlert } from './alert';
import { GET_ADMIN_DATA, GET_DATA_ERROR } from './types';
import setAuthToken from '../utils/setAuthToken';

// GET All Admins
export const getAllAdmins = () => async dispatch => {

        const res = await axios.get('http://localhost:5000/api/getAdminData');

        dispatch({
            type: GET_ADMIN_DATA,
            payload: res.data 
        });
    

};


