import {
    AUTHORIZE_RIA_TRANSACTIONS_REQUEST,
    AUTHORIZE_RIA_TRANSACTIONS_SUCCESS,
    AUTHORIZE_RIA_TRANSACTIONS_FAILURE,
  } from "../types/authorizeRiaTransactionType";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case AUTHORIZE_RIA_TRANSACTIONS_REQUEST:
        return {
          ...state, 
          loading: true,
        };
      case AUTHORIZE_RIA_TRANSACTIONS_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case AUTHORIZE_RIA_TRANSACTIONS_FAILURE:
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