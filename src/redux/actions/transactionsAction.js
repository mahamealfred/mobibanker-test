import axios from "axios";
import {
    TRANSACTIONS_REQUEST,
    TRANSACTIONS_SUCCESS,
    TRANSACTIONS_FAILURE,
  } from "../types/transactionsType";
  
export const transactionsAction = (username,password) => async (dispatch) => {
  try {
    dispatch(transactionsRequest());
   // let basicAuth='Basic ' + btoa(username + ':' + password);
 
    const Url='https://agentapi.mobicash.rw/api/agent/utilities/user/rest/v.4.14.01/all-transacion-by-id';
   const res = await axios.post(Url,{},{
    withCredentials: true,
    headers:{
    "Accept":"application/json",
    "Content-Type": "application/json",
    // 'Authorization': + basicAuth,
    },
  auth: {
    username,
    password
  }
   });
    const {data} = await res;
    console.log("transaction data...",data)
      if(res.data.responseCode===200){
        dispatch(transactionsSuccess(data.responseDescription));
      }   
  } catch (err) {
    if (err.response) {
      const errorMessage = 'Transaction Faild '
        dispatch(transactionsFailure(errorMessage));
      
    } else {
      dispatch(transactionsFailure("Network Error"));
    }
  }
};

export const transactionsRequest = () => {
  return {
    type: TRANSACTIONS_REQUEST,
  };
};

export const transactionsSuccess = (details) => {
  return {
    type: TRANSACTIONS_SUCCESS,
    payload: details,
  };
};
export const transactionsFailure = (error) => {
  return {
    type: TRANSACTIONS_FAILURE,
    payload: error,
  };
};