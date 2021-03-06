import * as types from '../constants/index';
// nhận data từ server
const initialState = [];
var notification = (state = initialState, action) => {
    switch(action.type) {
        case types.authConstants.NOTIFICATION_SHOW: {
            state = action.data;
            console.log(state);
            return state;
        }
        case types.authConstants.NOTIFICATION: {
            console.log(action);
            state.push(action.data);
            return [...state];
        }
        default : return state;
    }
}
export default notification;