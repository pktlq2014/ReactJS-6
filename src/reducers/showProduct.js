import * as types from "../constants/index";
// nhận data từ server
const initialState = [];
var showProduct = (state = initialState, action) => {
  switch (action.type) {
    case types.authConstants.SHOW_PRODUCT: {
        state = action.data;
        return state;
    }
    case types.authConstants.PRODUCT: {
      console.log(action);
      state.push(action.data);
      // console.log(state);
      return [...state];
    }
    default:
      return state;
  }
};
export default showProduct;
