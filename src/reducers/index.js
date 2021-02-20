import authReducer from './auth.reducers';
import {combineReducers} from 'redux';
const rootReducers = combineReducers({
    auth : authReducer
});
export default rootReducers;