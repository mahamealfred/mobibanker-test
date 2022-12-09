import {
    VALIDATE_NID_REQUEST,
    VALIDATE_NID_SUCCESS,
    VALIDATE_NID_FAILURE,
  } from "../types/validateNidType";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case VALIDATE_NID_REQUEST:
        return {
          ...state, 
          loading: true,
        };
      case VALIDATE_NID_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case VALIDATE_NID_FAILURE:
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