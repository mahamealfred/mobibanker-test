import {
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILURE,
  } from "../types/changePasswordType";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case CHANGE_PASSWORD_REQUEST:
        return {
          ...state, 
          loading: true,
        };
      case CHANGE_PASSWORD_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case CHANGE_PASSWORD_FAILURE:
        return {
          loading: false,
          details: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;