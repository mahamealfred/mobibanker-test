import {
    GET_BRANCHES_REQUEST,
    GET_BRANCHES_SUCCESS,
    GET_BRANCHES_FAILURE,
  } from "../types/getBranchesType";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_BRANCHES_REQUEST:
        return {
          ...state, 
          loading: true,
        };
      case GET_BRANCHES_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case GET_BRANCHES_FAILURE:
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