import axios from "axios";
import {
    GET_PREVIOUS_DEPOSITTRANSACTIONS_REQUEST,
    GET_PREVIOUS_DEPOSITTRANSACTIONS_SUCCESS,
    GET_PREVIOUS_DEPOSITTRANSACTIONS_FAILURE,
  } from "../types/getPreviousdepositTransactionsType";
  import dotenv from "dotenv"
  dotenv.config()
export const getPreviousdepositTransactionsAction = (details) => async (dispatch) => {
  try {
    dispatch(getPreviousdepositTransactionsRequest());
    const  {phonenumber}=details
    const agentId=phonenumber.replace(/[^a-zA-Z0-9 ]/g, '');

 const Url=process.env.REACT_APP_BASE+'/api/banking/finance/rest/v.4.14.01/deposity-receipt';
   const res = await axios.get(Url,{
    params:{
        agent_id:agentId
    }
   }, {
    // withCredentials: true,
    headers:{
    "Accept":"application/json",
    "Content-Type": "application/json"
 },
   });
      if(res.status===200){
        dispatch(getPreviousdepositTransactionsSuccess(res.data));
      } 
      else{
        dispatch(getPreviousdepositTransactionsFailure("Failed, Please try again later."));
      }
  } catch (err) {
    if (err.response) {
   let errorMessage = ''
       errorMessage="Something went wrong,Please try again later."
       // errorMessage=await err.response.data.message
        dispatch(getPreviousdepositTransactionsFailure(errorMessage));
      
    } else {
      dispatch(getPreviousdepositTransactionsFailure("The service is currently not available"));
    }
  }
};

export const getPreviousdepositTransactionsRequest = () => {
  return {
    type: GET_PREVIOUS_DEPOSITTRANSACTIONS_REQUEST,
  };
};

export const getPreviousdepositTransactionsSuccess = (details) => {
  return {
    type: GET_PREVIOUS_DEPOSITTRANSACTIONS_SUCCESS,
    payload: details,
  };
};
export const getPreviousdepositTransactionsFailure = (error) => {
  return {
    type: GET_PREVIOUS_DEPOSITTRANSACTIONS_FAILURE,
    payload: error,
  };
};