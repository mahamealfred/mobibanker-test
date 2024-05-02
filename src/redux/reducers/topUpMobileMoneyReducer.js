import {
    TOPUPMOBILEMONEY_REQUEST,
    TOPUPMOBILEMONEY_SUCCESS,
    TOPUPMOBILEMONEY_FAILURE,
  } from "../types/topUpMobileMoneyType";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case TOPUPMOBILEMONEY_REQUEST:
        return {
          ...state, 
          loading: true,
        };
      case TOPUPMOBILEMONEY_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case TOPUPMOBILEMONEY_FAILURE:
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