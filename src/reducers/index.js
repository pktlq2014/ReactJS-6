import login from './login';
import {combineReducers} from 'redux';
import dataLogin from './dataLogin';
const rootReducers = combineReducers({
    login : login,
    dataLogin : dataLogin
});
export default rootReducers;