import * as types from "./../constants/index";
import axios from "./../helpers/axios/axios";
import API from './../utils/API';
export const loginData = (data) => {
    return {
        type : types.authConstants.DATA_LOGIN,
        data : data
    }
}
export const login = () => {
  // return {
  //     type : types.authConstants.LOGIN_REQUEST,
  //     data : data
  // }
  return async (dispatch) => {
    // dispatch({
    //     type : types.authConstants.LOGIN_REQUEST
    // });
    // const res = await axios.post(`api`, {
    //     ...data
    // });
    // dispatch({
    //   type: types.authConstants.LOGIN_REQUEST,
    //   data: data,
    // });
    return API('api', 'GET', null).then(res => {
        dispatch(dataLogin(res.data));
    });
  };
};
export const dataLogin = (data) => {
    return {
        type : types.authConstants.LOGIN_REQUEST,
        data : data
    }
}
export const signOut = (data) => {
    return {
        type : types.authConstants.SIGNOUT,
        data : data
    }
}