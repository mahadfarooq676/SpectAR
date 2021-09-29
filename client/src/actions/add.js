import axios from 'axios';
import { setAlert } from './alert';
import { ADD_PRODUCT, UPDATE_PRODUCT } from './types';



//Add Product
export const addProduct = ({ productName, productPrice, productCategory, productQuantity, frameLength, frameWeight, lensWidth, lensHeight, templeLength, bridgeWidth, productImage, status, addedBy, addedDate }, history) => async dispatch => {
    const config = {
        headers: {
            'content-Type': 'application/json',
        }
    }

    const body = JSON.stringify({ productName, productPrice, productCategory, productQuantity, frameLength, frameWeight, lensWidth, lensHeight, templeLength, bridgeWidth, productImage, status, addedBy, addedDate });

    try{
        const res = await axios.post('http://localhost:5000/api/addProduct', body, config);

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
export const updateProduct = ({ productId, productName, productPrice, productCategory, productQuantity, frameLength, frameWeight, lensWidth, lensHeight, templeLength, bridgeWidth, productImage, status, addedBy, addedDate }, history) => async dispatch => {
    const config = {
        headers: {
            'content-Type': 'application/json',
        }
    }

    const body = JSON.stringify({ productId, productName, productPrice, productCategory, productQuantity, frameLength, frameWeight, lensWidth, lensHeight, templeLength, bridgeWidth, productImage, status, addedBy, addedDate });

    try{
        const res = await axios.put('http://localhost:5000/api/updateProduct', body, config);

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

