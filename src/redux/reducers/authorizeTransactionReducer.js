import {
    AUTHORIZE_TRANSACTIONS_REQUEST,
    AUTHORIZE_TRANSACTIONS_SUCCESS,
    AUTHORIZE_TRANSACTIONS_FAILURE,
  } from "../types/authorizeTransactionType";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case AUTHORIZE_TRANSACTIONS_REQUEST:
        return {
          ...state, 
          loading: true,
        };
      case AUTHORIZE_TRANSACTIONS_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case AUTHORIZE_TRANSACTIONS_FAILURE:
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