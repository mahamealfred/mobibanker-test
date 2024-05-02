import {
    GET_ELECTRICITYDETAILS_REQUEST,
    GET_ELECTRICITYDETAILS_SUCCESS,
    GET_ELECTRICITYDETAILS_FAILURE,
  } from "../types/electricityType";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ELECTRICITYDETAILS_REQUEST:
        return {
          ...state, 
          loading: true,
        };
      case GET_ELECTRICITYDETAILS_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case GET_ELECTRICITYDETAILS_FAILURE:
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