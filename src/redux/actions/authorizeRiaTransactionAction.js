import axios from "axios";
import {
    AUTHORIZE_RIA_TRANSACTIONS_REQUEST,
    AUTHORIZE_RIA_TRANSACTIONS_SUCCESS,
    AUTHORIZE_RIA_TRANSACTIONS_FAILURE,
  } from "../types/authorizeRiaTransactionType";
  import dotenv from "dotenv"
  dotenv.config()
export const authorizeRiaTransactionsAction = (transactionId,auth,password) => async (dispatch) => {
  const {username}=auth
  // const {password}=auth
 // const {password}=auth

  try {
    dispatch(authorizeRiaTransactionsRequest());
    let basicAuth='Basic ' + btoa(username + ':' + password);
   
  var config = {
    method: 'get',
    url: process.env.REACT_APP_BASE_URL+`/api/ria/service/rest/v.4.14.01/ria-Remitance-Client-Withdraw-Auhorization?mobicashref=${transactionId}`,
    headers: { 
      'Authorization': `${basicAuth}`
    }
  };
  
  const res = await axios(config)


      if(res.data.responseCode===204){
        dispatch(authorizeRiaTransactionsSuccess(res.data));
      }  
      else if(res.data.responseCode!==204){
        dispatch(authorizeRiaTransactionsFailure(res.data.codeDescription));
      }
      else{
        dispatch(authorizeRiaTransactionsFailure("Failed, Please try again later."));
      }
  } catch (err) {
    if (err.response) {
      const errorMessage = 'Transaction Failed '
        dispatch(authorizeRiaTransactionsFailure(errorMessage));
      
    } else {
      dispatch(authorizeRiaTransactionsFailure("The service is currently not available"));
    }
  }
};

export const authorizeRiaTransactionsRequest = () => {
  return {
    type: AUTHORIZE_RIA_TRANSACTIONS_REQUEST,
  };
};

export const authorizeRiaTransactionsSuccess = (details) => {
  return {
    type: AUTHORIZE_RIA_TRANSACTIONS_SUCCESS,
    payload: details,
  };
};
export const authorizeRiaTransactionsFailure = (error) => {
  return {
    type: AUTHORIZE_RIA_TRANSACTIONS_FAILURE,
    payload: error,
  };
};