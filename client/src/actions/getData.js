import axios from 'axios';
import { setAlert } from './alert';
import { GET_ADMIN_DATA, GET_PRODUCT_DATA, GET_PRODUCT_BY_ID, GET_CATEGORIES, GET_DATA_ERROR, URL, GET_BANNERS, GET_ORDERS, GET_ORDER_BY_ID } from './types';
import setAuthToken from '../utils/setAuthToken';

// GET All Admins
export const getAllAdmins = () => async dispatch => {

        const res = await axios.get(URL + 'api/getAdminData');

        dispatch({
            type: GET_ADMIN_DATA,
            payload: res.data 
        });
};

// GET All Products
export const getAllProducts = () => async dispatch => {

    const res = await axios.get(URL + 'api/getProductData');

    dispatch({
        type: GET_PRODUCT_DATA,
        payload: res.data 
    });
}


// GET Product By Id
export const getProduct = (_id) => async dispatch => {
    try{
    const config = {
        headers: {
            'content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ _id });

    const res = await axios.get(URL + 'api/getProduct/'+_id);

    dispatch({
        type: GET_PRODUCT_BY_ID,
        payload: res.data 
    });
    }catch{
        dispatch({
            type: GET_DATA_ERROR
        });
    }
}

// GET Categories
export const getCategories = () => async dispatch => {

    const res = await axios.get(URL + 'api/getCategories');

    dispatch({
        type: GET_CATEGORIES,
        payload: res.data 
    });
}

// GET_BANNERS
export const getBanners = () => async dispatch => {

    const res = await axios.get(URL + 'api/getBanners');

    dispatch({
        type: GET_BANNERS,
        payload: res.data 
    });
}

// GET_ORDERS
export const getOrders = () => async dispatch => {

    const res = await axios.get(URL + 'api/getOrders');

    dispatch({
        type: GET_ORDERS,
        payload: res.data 
    });
}


// GET Order By Id
export const getOrder = (_id) => async dispatch => {
    try{
    const config = {
        headers: {
            'content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ _id });

    const res = await axios.get(URL + 'api/getOrder/'+_id);

    dispatch({
        type: GET_ORDER_BY_ID,
        payload: res.data 
    });
    }catch{
        dispatch({
            type: GET_DATA_ERROR
        });
    }
}