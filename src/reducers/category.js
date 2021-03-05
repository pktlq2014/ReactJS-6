import * as types from "../constants/index";
// nhận data từ server
const initialState = [];
var category = (state = initialState, action) => {
  switch (action.type) {
    case types.authConstants.CATEGORY: {
      console.log(action);
      state = action.data;
      return state;
    }
    case types.authConstants.ADD_CATEGORY: {
        state.push(action.data);
        return [...state];
    }
    case types.authConstants.UPDATE_CATEGORY: {
      // state = action.category;
      // return [...state];
      state.map((values, index) => {
        if(values.id === action.category.id) {
          //return values = action.category;
          console.log(values);
          values.id = action.category.id;
          values.name = action.category.name;
          values.idParent = action.category.idParent;
          values.type = action.category.type;
        }
      }); 
      console.log(state);
      // state = result;
      return [...state];
    }
    case types.authConstants.DELETE_CATEGORY: {
      var {id} = action;
      var data = [...state];
      console.log(id);
      console.log(data);
      var result = data.filter((values, index) => {
        if(values.id !== id.id) {
          return values;
        }
      });
      console.log(result);
      state = result;
      return [...state];
    }
    default: return state;
  }
};
export default category;
