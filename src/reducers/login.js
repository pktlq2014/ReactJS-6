import * as types from './../constants/index';
// nhận data từ server
const initialState = [];
var login = (state = initialState, action) => {
    switch(action.type) {
        case types.authConstants.LOGIN_REQUEST: {
            state = action.data;
            console.log(state);
            return state;
        }
        case types.authConstants.SIGNUP: {
            console.log(action);
            var {data} = action;
            state.push(data);
            return state;
        }
        default : return state;
    }
}
export default login;