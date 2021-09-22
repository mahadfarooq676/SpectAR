import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import getData from './getData';
import add from './add';
export default combineReducers({
    alert,
    auth,
    getData,
    add
});
