import axios from "axios";
import {
    AUTHORIZE_TRANSACTIONS_REQUEST,
    AUTHORIZE_TRANSACTIONS_SUCCESS,
    AUTHORIZE_TRANSACTIONS_FAILURE,
  } from "../types/authorizeTransactionType";
  import dotenv from "dotenv"
  dotenv.config()
export const authorizeTransactionsAction = (transactionId,auth,password) => async (dispatch) => {
  const {username}=auth
  // const {password}=auth
 // const {password}=auth

  try {
    dispatch(authorizeTransactionsRequest());
    let basicAuth='Basic ' + btoa(username + ':' + password);
   
  var config = {
    method: 'get',
    url: process.env.REACT_APP_BASE+`/api/banking/finance/rest/v.4.14.01/gt-bank-withdrawal-autorisation?transactionId=${transactionId}`,
    headers: { 
      'Authorization': `${basicAuth}`
    }
  };
  
  const res = await axios(config)


      if(res.data.responseCode===204){
        dispatch(authorizeTransactionsSuccess(res.data));
      }  
      else if(res.data.responseCode!==204){
        dispatch(authorizeTransactionsFailure(res.data.codeDescription));
      }
      else{
        dispatch(authorizeTransactionsFailure("Failed, Please try again later."));
      }
  } catch (err) {
    if (err.response) {
      const errorMessage = 'Transaction Failed '
        dispatch(authorizeTransactionsFailure(errorMessage));
      
    } else {
      dispatch(authorizeTransactionsFailure("The service is currently not available"));
    }
  }
};

export const authorizeTransactionsRequest = () => {
  return {
    type: AUTHORIZE_TRANSACTIONS_REQUEST,
  };
};

export const authorizeTransactionsSuccess = (details) => {
  return {
    type: AUTHORIZE_TRANSACTIONS_SUCCESS,
    payload: details,
  };
};
export const authorizeTransactionsFailure = (error) => {
  return {
    type: AUTHORIZE_TRANSACTIONS_FAILURE,
    payload: error,
  };
};