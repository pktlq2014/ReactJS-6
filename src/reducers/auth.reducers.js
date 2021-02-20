import * as types from './../constants/index';
const initialState = {
    name : 'Riz'
};
export default  (state = initialState, action) => {
    switch(action.type) {
        case types.authConstants.LOGIN_REQUEST: {
            state = {
                ...state,
                ...action.payload
            }
            break;
        }
        default : return state;
    }
    return state;
}