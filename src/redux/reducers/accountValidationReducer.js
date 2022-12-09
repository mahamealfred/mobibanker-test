import {
    ACCOUNT_VALIDATION_REQUEST,
    ACCOUNT_VALIDATION_SUCCESS,
    ACCOUNT_VALIDATION_FAILURE,
  } from "../types/accountValidationType";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case ACCOUNT_VALIDATION_REQUEST:
        return {
          ...state, 
          loading: true,
        };
      case ACCOUNT_VALIDATION_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case ACCOUNT_VALIDATION_FAILURE:
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