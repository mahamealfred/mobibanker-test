import {
    LTSS_PAYMENT_REQUEST,
    LTSS_PAYMENT_SUCCESS,
    LTSS_PAYMENT_FAILURE,
  } from "../types/ltssPaymentType";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case LTSS_PAYMENT_REQUEST:
        return {
          ...state, 
          loading: true,
        };
      case LTSS_PAYMENT_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case LTSS_PAYMENT_FAILURE:
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