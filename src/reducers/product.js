import * as types from "../constants/index";
// nhận data từ server
const initialState = [];
var product = (state = initialState, action) => {
  switch (action.type) {
    case types.authConstants.PRODUCT: {
      console.log(action);
      state = action.data;
      // console.log(state);
      return state;
    }
    default:
      return state;
  }
};
export default product;
