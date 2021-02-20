import {authConstants} from './../constants/index';
export const login = (user) => {
    console.log(user);
    return async (dispatch) => {
        dispatch({
            type : authConstants.LOGIN_REQUEST,
            payload : {
                ...user
            }
        });
    }
} 