import {
    ADD_PRODUCT, UPDATE_PRODUCT, ADD_BANNER
} from '../actions/types';

const initialState = {

}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type){
        
        case ADD_PRODUCT: 
            return{
                ...state,
                ...payload
            };

        case UPDATE_PRODUCT: 
        return{
            ...state,
            ...payload
        };

        case ADD_BANNER: 
        return{
            ...state,
            ...payload
        };

        default:
            return state;
    }
}