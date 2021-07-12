import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import getData from './getData';
export default combineReducers({
    alert,
    auth,
    getData
});
