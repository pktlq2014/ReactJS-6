import login from './login';
import {combineReducers} from 'redux';
import dataLogin from './dataLogin';
import category from './category';
const rootReducers = combineReducers({
    login : login,
    dataLogin : dataLogin,
    category : category
});
export default rootReducers;