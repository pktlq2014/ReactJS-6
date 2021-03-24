import login from './login';
import {combineReducers} from 'redux';
import dataLogin from './dataLogin';
import category from './category';
import showProduct from './showProduct';
import page from './page';
import notification from './notification';
const rootReducers = combineReducers({
    login : login,
    dataLogin : dataLogin,
    category : category,
    showProduct : showProduct,
    page : page,
    notification : notification
});
export default rootReducers;