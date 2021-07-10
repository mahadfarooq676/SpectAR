import {
    GET_ADMIN_DATA,
    GET_DATA_ERROR
} from '../actions/types';

const initialState = {
    admins: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type){
        case GET_ADMIN_DATA:
            return{
                ...state,
                admins: payload
            };

        default:
            return state;
    }
}