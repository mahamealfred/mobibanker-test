import axios from "axios";
import {
    AUTHORIZE_TRANSACTIONS_REQUEST,
    AUTHORIZE_TRANSACTIONS_SUCCESS,
    AUTHORIZE_TRANSACTIONS_FAILURE,
  } from "../types/authorizeTransactionType";
  
export const authorizeTransactionsAction = (transactionId,auth) => async (dispatch) => {
  const {username}=auth
  const {password}=auth
 // const {password}=auth
 console.log("all tr",transactionId,auth)
  try {
    dispatch(authorizeTransactionsRequest());
   // let basicAuth='Basic ' + btoa(username + ':' + password);

    const Url=`https://agencyapi.mobicash.rw/api/banking/finance/rest/v.4.14.01/gt-bank-withdrawal-autorisation`;
   const res = await axios.get(Url,{
    params:{ transactionId:transactionId }
   },{
    withCredentials: true,
    headers:{
    "Accept":"application/json",
    "Content-Type": "application/json",
     'Authorization':"Basic " + auth.basicAuth,
    },
  auth: {
    username,
    password
  }
   });

      if(res.data.responseCode===100){
        dispatch(authorizeTransactionsSuccess(res.data.data));
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