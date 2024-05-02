import {
    ELECTRICITY_PAYMENT_REQUEST,
    ELECTRICITY_PAYMENT_SUCCESS,
    ELECTRICITY_PAYMENT_FAILURE,
  } from "../types/electricityPaymentType";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case ELECTRICITY_PAYMENT_REQUEST:
        return {
          ...state, 
          loading: true,
        };
      case ELECTRICITY_PAYMENT_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case ELECTRICITY_PAYMENT_FAILURE:
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