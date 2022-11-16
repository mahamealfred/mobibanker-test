import {
    FORGOTPASSWORD_REQUEST,
    FORGOTPASSWORD_SUCCESS,
    FORGOTPASSWORD_FAILURE,
  } from "../types/forgotPasswordType";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case FORGOTPASSWORD_REQUEST:
        return {
          ...state, 
          loading: true,
        };
      case FORGOTPASSWORD_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case FORGOTPASSWORD_FAILURE:
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