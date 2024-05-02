import {
    CLIENT_VALIDATION_REQUEST,
    CLIENT_VALIDATION_SUCCESS,
    CLIENT_VALIDATION_FAILURE,
  } from "../types/clientValidationType";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case CLIENT_VALIDATION_REQUEST:
        return {
          ...state, 
          loading: true,
        };
      case CLIENT_VALIDATION_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case CLIENT_VALIDATION_FAILURE:
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