import * as types from './../constants/index';
const initialState = [];
var login = (state = initialState, action) => {
    switch(action.type) {
        case types.authConstants.LOGIN_REQUEST: {
            state = action.data;
            console.log(state);
            return state;
        }
        default : return state;
    }
}
export default login;