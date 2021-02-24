import login from './login';
import {combineReducers} from 'redux';
import dataLogin from './dataLogin';
import category from './category';
import product from './product';
const rootReducers = combineReducers({
    login : login,
    dataLogin : dataLogin,
    category : category,
    product : product
});
export default rootReducers;