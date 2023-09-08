import {
    REGISTER_CLIENT_REQUEST,
    REGISTER_CLIENT_SUCCESS,
    REGISTER_CLIENT_FAILURE,
  } from "../types/registerClientType";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case REGISTER_CLIENT_REQUEST:
        return {
          ...state, 
          loading: true,
        };
      case REGISTER_CLIENT_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case REGISTER_CLIENT_FAILURE:
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