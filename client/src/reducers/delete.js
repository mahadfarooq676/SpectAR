import {
    DELETE_PRODUCT, DELETE_ADMIN
} from '../actions/types';

const initialState = {

}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type){
        

        case DELETE_PRODUCT: 
        return{
            ...state,
            ...payload
        };

        case DELETE_ADMIN: 
        return{
            ...state,
            ...payload
        };

        default:
            return state;
    }
}