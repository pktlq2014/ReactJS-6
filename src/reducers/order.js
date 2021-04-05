import * as types from "../constants/index";
// nhận data từ server
const initialState = [];
var order = (state = initialState, action) => {
  switch (action.type) {
    case types.authConstants.ORDER: {
      state = action.data;
      console.log(state);
      return state;
    }
    case types.authConstants.ORDER_UPDATE: {
      console.log(action);
      state.forEach((values, index) => {
        if (values.id === action.order.id) {
          console.log(values);
          values.status = action.order.status;
        }
      });
      console.log(state);
      return [...state];
    }
    case types.authConstants.DELETE_ORDERS: {
      console.log(action);
      state.forEach((values, index) => {
        if (values.id === action.data.id) {
          state.splice(index, 1);
        }
      });
      return [...state];
    }
    default:
      return state;
  }
};
export default order;
