import axios from 'axios';
import { setAlert } from './alert';
import { ADD_PRODUCT } from './types';



//Add Admin Admin
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
        dispatch(setAlert('New Producd Added Successfully', 'success'));
        history.push('/AppRoutes/manageProduct');
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }    

    }
}

