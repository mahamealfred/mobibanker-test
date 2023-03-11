import {
    AUTHORIZE_COMMISSION_REQUEST,
    AUTHORIZE_COMMISSION_SUCCESS,
    AUTHORIZE_COMMISSION_FAILURE,
  } from "../types/authorizeCommissionType";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case AUTHORIZE_COMMISSION_REQUEST:
        return {
          ...state, 
          loading: true,
        };
      case AUTHORIZE_COMMISSION_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case AUTHORIZE_COMMISSION_FAILURE:
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