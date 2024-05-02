import {
    GET_RIA_ORDER_DETAILS_REQUEST,
    GET_RIA_ORDER_DETAILS_SUCCESS,
    GET_RIA_ORDER_DETAILS_FAILURE,
  } from "../types/getRiaOrderDetailsType";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_RIA_ORDER_DETAILS_REQUEST:
        return {
          ...state, 
          loading: true,
        };
      case GET_RIA_ORDER_DETAILS_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case GET_RIA_ORDER_DETAILS_FAILURE:
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