import {
    RIA_DEPOSIT_REQUEST,
    RIA_DEPOSIT_SUCCESS,
    RIA_DEPOSIT_FAILURE,
  } from "../types/riaDepositType";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case RIA_DEPOSIT_REQUEST:
        return {
          ...state, 
          loading: true,
        };
      case RIA_DEPOSIT_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case RIA_DEPOSIT_FAILURE:
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