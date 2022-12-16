import {
    OPEN_ACCOUNT_REQUEST,
    OPEN_ACCOUNT_SUCCESS,
    OPEN_ACCOUNT_FAILURE,
  } from "../types/openAccountType";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case OPEN_ACCOUNT_REQUEST:
        return {
          ...state, 
          loading: true,
        };
      case OPEN_ACCOUNT_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case OPEN_ACCOUNT_FAILURE:
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