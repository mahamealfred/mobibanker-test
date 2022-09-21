import {
    GET_CBHI_NID_DETAILS_REQUEST,
    GET_CBHI_NID_DETAILS_SUCCESS,
    GET_CBHI_NID_DETAILS_FAILURE,
  } from "../types/getCbhiNidDetailsType";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_CBHI_NID_DETAILS_REQUEST:
        return {
          ...state, 
          loading: true,
        };
      case GET_CBHI_NID_DETAILS_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case GET_CBHI_NID_DETAILS_FAILURE:
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