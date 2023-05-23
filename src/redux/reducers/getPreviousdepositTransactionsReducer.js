import {
    GET_PREVIOUS_DEPOSITTRANSACTIONS_REQUEST,
    GET_PREVIOUS_DEPOSITTRANSACTIONS_SUCCESS,
    GET_PREVIOUS_DEPOSITTRANSACTIONS_FAILURE,
  } from "../types/getPreviousdepositTransactionsType";
  
  const initialState = {
    loading: false,
    details: [],
    error: "",
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_PREVIOUS_DEPOSITTRANSACTIONS_REQUEST:
        return {
          ...state, 
          loading: true,
        };
      case GET_PREVIOUS_DEPOSITTRANSACTIONS_SUCCESS:
        return {
          loading: false,
          details: action.payload,
          error: "",
        };
      case GET_PREVIOUS_DEPOSITTRANSACTIONS_FAILURE:
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