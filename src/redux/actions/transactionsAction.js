import axios from "axios";
import {
    TRANSACTIONS_REQUEST,
    TRANSACTIONS_SUCCESS,
    TRANSACTIONS_FAILURE,
  } from "../types/transactionsType";
  
export const transactionsAction = (auth) => async (dispatch) => {
  const {username}=auth
 // const {password}=auth
  try {
    dispatch(transactionsRequest());
   // let basicAuth='Basic ' + btoa(username + ':' + password);

    const Url='https://agentapi.mobicash.rw/api/agent/utilities/user/rest/v.4.14.01/all-transacion-by-id';
   const res = await axios.post(Url,{},{
    withCredentials: true,
    headers:{
    "Accept":"application/json",
    "Content-Type": "application/json",
     'Authorization':"Basic " + auth.basicAuth,
    },
  // auth: {
  //   username,
  //   password
  // }
   });

      if(res.data.responseCode===100){
        dispatch(transactionsSuccess(res.data.data));
      }   
  } catch (err) {
    if (err.response) {
      const errorMessage = 'Transaction Faild '
        dispatch(transactionsFailure(errorMessage));
      
    } else {
      dispatch(transactionsFailure("The service is currently not available"));
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