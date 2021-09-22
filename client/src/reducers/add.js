import {
    ADD_PRODUCT
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

        default:
            return state;
    }
}