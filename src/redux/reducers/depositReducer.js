import {
    DEPOSIT_REQUEST,
    DEPOSIT_SUCCESS,
    DEPOSIT_FAILURE,
  } from "../types/depositType";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case DEPOSIT_REQUEST:
        return {
          ...state, 
          loading: true,
        };
      case DEPOSIT_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case DEPOSIT_FAILURE:
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