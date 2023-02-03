import axios from "axios";
import {
    ACCOUNT_VALIDATION_REQUEST,
    ACCOUNT_VALIDATION_SUCCESS,
    ACCOUNT_VALIDATION_FAILURE,
  } from "../types/accountValidationType";
  import dotenv from "dotenv"
  dotenv.config()
export const accountValidationAction = (details) => async (dispatch) => {
  try {
    dispatch(accountValidationRequest());
    const  {accountNumber}=details
 
 const Url='https://agencybank.mobicash.rw/api/agent/utilities/user/rest/v.4.14.01/gt-bank-account-validation';
   const res = await axios.get(Url,{
    params:{
        account:accountNumber
    }
   }, {
    // withCredentials: true,
    headers:{
    "Accept":"application/json",
    "Content-Type": "application/json"
 },
   });
      if(res.data.responseCode===100){
        dispatch(accountValidationSuccess(res.data));
      }  
      else{
        let errMsg=res.data.data.reason
        dispatch(accountValidationFailure(errMsg));
      }
  } catch (err) {
    if (err.response) {
   let errorMessage = ''
       errorMessage="Something went wrong,Please try again later."
       // errorMessage=await err.response.data.message
        dispatch(accountValidationFailure(errorMessage));
      
    } else {
      dispatch(accountValidationFailure("The service is currently not available"));
    }
  }
};

export const accountValidationRequest = () => {
  return {
    type: ACCOUNT_VALIDATION_REQUEST,
  };
};

export const accountValidationSuccess = (details) => {
  return {
    type: ACCOUNT_VALIDATION_SUCCESS,
    payload: details,
  };
};
export const accountValidationFailure = (error) => {
  return {
    type: ACCOUNT_VALIDATION_FAILURE,
    payload: error,
  };
};