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
        console.log(res);
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
export const signUp = (data) => {
    return (dispatch) => {
        // thời gian lấy dữ liệu từ server về lâu hơn thời gian lấy dữ liệu 
        // rồi truyền vào dispatch, nên sinh ra lỗi middleware
        // hay nói cách khác là khi truyền dữ liệu từ server vào dispatch nhanh quá
        // lúc này chưa có dữ liệu để truyền vào dispatch
        // middleware là lớp nằm giữa reducers và dispatch actions
        // giúp fetch dữ liệu xong mới dispatch actions
        return API('api', 'POST', data).then(res => {
            dispatch(signUpAPI(res.data));
        });
    }
}
export const signUpAPI = (data) => {
    return {
        type : types.authConstants.SIGNUP,
        data : data
    }
}
export const category = () => {
    return async (dispatch) => {
      return API('category', 'GET', null).then(res => {
          console.log(res);
          dispatch(categoryAPI(res.data));
      });
    };
  };
  export const categoryAPI = (data) => {
      return {
          type : types.authConstants.CATEGORY,
          data : data
      }
  }
  export const categoryADD = (data) => {
    return (dispatch) => {
        // thời gian lấy dữ liệu từ server về lâu hơn thời gian lấy dữ liệu 
        // rồi truyền vào dispatch, nên sinh ra lỗi middleware
        // hay nói cách khác là khi truyền dữ liệu từ server vào dispatch nhanh quá
        // lúc này chưa có dữ liệu để truyền vào dispatch
        // middleware là lớp nằm giữa reducers và dispatch actions
        // giúp fetch dữ liệu xong mới dispatch actions
        return API('category', 'POST', data).then(res => {
            console.log(res.data);
            dispatch(addCategory(res.data));
        });
    }
}
export const addCategory = (data) => {
    return {
        type : types.authConstants.ADD_CATEGORY,
        data : data
    }
}
export const productAPI = (data) => {
    return (dispatch) => {
        // thời gian lấy dữ liệu từ server về lâu hơn thời gian lấy dữ liệu 
        // rồi truyền vào dispatch, nên sinh ra lỗi middleware
        // hay nói cách khác là khi truyền dữ liệu từ server vào dispatch nhanh quá
        // lúc này chưa có dữ liệu để truyền vào dispatch
        // middleware là lớp nằm giữa reducers và dispatch actions
        // giúp fetch dữ liệu xong mới dispatch actions
        return API('product', 'POST', data).then(res => {
            console.log(res.data);
            dispatch(productReducers(res.data));
        });
    }
}
export const productReducers = (data) => {
    return {
        type : types.authConstants.PRODUCT,
        data : data
    }
}
export const showProduct = () => {
    return async (dispatch) => {
      return API('product', 'GET', null).then(res => {
          console.log(res);
          dispatch(showProductReducers(res.data));
      });
    };
  };
  export const showProductReducers = (data) => {
      return {
          type : types.authConstants.SHOW_PRODUCT,
          data : data
      }
  }
export const updateCategoryAPI = (category) => {
    return (dispatch) => {
        // thời gian lấy dữ liệu từ server về lâu hơn thời gian lấy dữ liệu 
        // rồi truyền vào dispatch, nên sinh ra lỗi middleware
        // hay nói cách khác là khi truyền dữ liệu từ server vào dispatch nhanh quá
        // lúc này chưa có dữ liệu để truyền vào dispatch
        // middleware là lớp nằm giữa reducers và dispatch actions
        // giúp fetch dữ liệu xong mới dispatch actions
        return API(`category/${category.id}`, 'PUT', category).then(res => {
            console.log(category);
            dispatch(updateCategoryReducers(res.data));
        });
    }
}
export const updateCategoryReducers = (category) => {
    return {
        type : types.authConstants.UPDATE_CATEGORY,
        category : category
    }
}