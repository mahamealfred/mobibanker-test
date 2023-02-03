import axios from "axios";
import {
    AUTHORIZE_TRANSACTIONS_REQUEST,
    AUTHORIZE_TRANSACTIONS_SUCCESS,
    AUTHORIZE_TRANSACTIONS_FAILURE,
  } from "../types/authorizeTransactionType";
  
export const authorizeTransactionsAction = (transactionId,auth,password) => async (dispatch) => {
  const {username}=auth
  // const {password}=auth
 // const {password}=auth

  try {
    dispatch(authorizeTransactionsRequest());
    let basicAuth='Basic ' + btoa(username + ':' + password);
   
  var config = {
    method: 'get',
    url: `https://agencybank.mobicash.rw/api/banking/finance/rest/v.4.14.01/gt-bank-withdrawal-autorisation?transactionId=${transactionId}`,
    headers: { 
      'Authorization': `${basicAuth}`
    }
  };
  
  const res = await axios(config)


      if(res.data.responseCode===204){
        dispatch(authorizeTransactionsSuccess(res.data));
      }   
      else{
        dispatch(authorizeTransactionsFailure(res.data.codeDescription));
      }
  } catch (err) {
    if (err.response) {
      const errorMessage = 'Transaction Faild '
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