import {
    RESETPASSWORD_REQUEST,
    RESETPASSWORD_SUCCESS,
    RESETPASSWORD_FAILURE,
  } from "../types/resetPasswordType";
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case RESETPASSWORD_REQUEST:
        return {
          ...state, 
          loading: true,
        };
      case RESETPASSWORD_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case RESETPASSWORD_FAILURE:
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