import axios from 'axios';
import { setAlert } from './alert';
import { DELETE_PRODUCT, DELETE_ADMIN, URL } from './types';


//Delete Product
export const deleteProduct = ({ _id }, history) => async dispatch => {
    const config = {
        headers: {
            'content-Type': 'application/json',
        }
    }

    const body = JSON.stringify({ _id });

    try{
        const res = await axios.put(URL + 'api/deleteProduct', body, config);

        dispatch({
            type: DELETE_PRODUCT,
            payload: res.data
        });
        window.location="/AppRoutes/manageProduct";
        dispatch(setAlert('Product Delete Successfully', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }    

    }
}

//Delete Admin
export const deleteAdmin = ({ _id }, history) => async dispatch => {
    const config = {
        headers: {
            'content-Type': 'application/json',
        }
    }

    const body = JSON.stringify({ _id });

    try{
        const res = await axios.put(URL + 'api/deleteAdmin', body, config);

        dispatch({
            type: DELETE_ADMIN,
            payload: res.data
        });
        window.location="/AppRoutes/manageAdmins";
        dispatch(setAlert('Admin Delete Successfully', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }    

    }
}


//Delete Bannner
export const deleteBannerr = ({ _id }, history) => async dispatch => {
    const config = {
        headers: {
            'content-Type': 'application/json',
        }
    }

    const body = JSON.stringify({ _id });

    try{
        const res = await axios.post(URL + 'api/deleteBanner', body, config);

        dispatch({
            type: DELETE_ADMIN,
            payload: res.data
        });
        window.location="/AppRoutes/manageBanner";
        dispatch(setAlert('Banner Delete Successfully', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }    

    }
}