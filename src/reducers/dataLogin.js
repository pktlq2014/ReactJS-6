import * as types from '../constants/index';
// tạo 1 object trên local để kiểm tra trường hợp và so sánh đăng nhập
var dataLogin = JSON.parse(localStorage.getItem('dataLogin'));
const initialState = dataLogin;
var login = (state = initialState, action) => {
    switch(action.type) {
        case types.authConstants.DATA_LOGIN: {
            state = action.data;
            console.log(state);
            //localStorage.setItem('dataLogin', JSON.stringify(state));
            return state;
        }
        case types.authConstants.SIGNOUT: {
            console.log(action);
            if(action.data === 0) {
                //localStorage.clear();
                localStorage.removeItem('dataLogin');
                state = null;
            }
            return state;
        }
        default : return state;
    }
}
export default login;