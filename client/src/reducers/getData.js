import {
    GET_ADMIN_DATA,
    GET_PRODUCT_DATA,
    GET_DATA_ERROR,
    GET_PRODUCT_BY_ID,
    GET_CATEGORIES,
    GET_BANNERS,
    GET_ORDERS,
    GET_ORDER_BY_ID
} from '../actions/types';

const initialState = {
    admins: [],
    products: [],
    categories: [],
    banners: [],
    orders: [],
    productById: null,
    orderById: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type){
        case GET_ADMIN_DATA:
            return{
                ...state,
                admins: payload,
                loading: false
            };

        case GET_PRODUCT_DATA:
            return{
                ...state,
                products: payload,
                loading: false
            };
        
        case GET_PRODUCT_BY_ID:
            return{
                ...state,
                productById: payload,
                loading: false
            };

        case GET_CATEGORIES:
        return{
            ...state,
            categories: payload,
            loading: false
        }; 
        case GET_BANNERS:
        return{
            ...state,
            banners: payload,
            loading: false
        };
        case GET_ORDERS:
        return{
            ...state,
            orders: payload,
            loading: false
        };
        case GET_ORDER_BY_ID:
        return{
            ...state,
            orderById: payload,
            loading: false
        };
        case GET_DATA_ERROR:
        return{
            ...state
        };

       

        default:
            return state;
    }
}