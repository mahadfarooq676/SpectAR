import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import getData from './getData';
import add from './add';
import deletes from './delete'

export default combineReducers({
    alert,
    auth,
    getData,
    add,
    deletes
});
