import axios from 'axios';
import { setAlert } from './alert';
import { ADD_PRODUCT, UPDATE_PRODUCT, ADD_BANNER, UPDATE_ADMIN, URL } from './types';



//Add Product
export const addProduct = (formdata, history) => async dispatch => {
    try{
        const res = await axios.post(URL + 'api/addProduct', formdata);

        dispatch({
            type: ADD_PRODUCT,
            payload: res.data
        });
        dispatch(setAlert('New Product Added Successfully', 'success'));
        history.push('/AppRoutes/manageProduct');

    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }    

    }
}

//Update Product
export const updateProduct = ({ productId, productName, brandName, productPrice, salesPrice, sku, productCategory, productQuantity, shortDescription, highlights, detailedDescription, materialType, frameLength, frameWeight, lensWidth, lensHeight, templeLength, bridgeWidth, productImage, status, addedBy, addedDate }, history) => async dispatch => {
    const config = {
        headers: {
            'content-Type': 'application/json',
        }
    }

    const body = JSON.stringify({ productId, productName, brandName, productPrice, salesPrice, sku, productCategory, productQuantity, shortDescription, highlights, detailedDescription, materialType, frameLength, frameWeight, lensWidth, lensHeight, templeLength, bridgeWidth, productImage, status, addedBy, addedDate });

    try{
        const res = await axios.put(URL + 'api/updateProduct', body, config);

        dispatch({
            type: UPDATE_PRODUCT,
            payload: res.data
        });
        dispatch(setAlert('Product Updated Successfully', 'success'));
        history.push('/AppRoutes/manageProduct');
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }    

    }
}


//Update Admin
export const updateAdmin = ({ adminId, name, email, password, role, addedBy, addedDate, status }, history) => async dispatch => {
    const config = {
        headers: {
            'content-Type': 'application/json',
        }
    }

    const body = JSON.stringify({ adminId, name, email, password, role, addedBy, addedDate, status });

    try{
        const res = await axios.put(URL + 'api/updateAdmin', body, config);

        dispatch({
            type: UPDATE_ADMIN,
            payload: res.data
        });
        dispatch(setAlert('Admin Updated Successfully', 'success'));
        history.push('/AppRoutes/manageAdmins');
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }    

    }
}


//Add Banner
export const addBanner = (formData, history) => async dispatch => {
    const config = {
        headers: {
            'content-Type': 'application/json',
        }
    }

     const body = { formData };

    try{
        const res = await axios.post(URL + 'api/addBanner', formData);

        dispatch({
            type: ADD_BANNER,
            payload: res.data
        });
        dispatch(setAlert('New Banner Added Successfully', 'success'));
        history.push('/AppRoutes/manageBanner');

    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }    

    }
}