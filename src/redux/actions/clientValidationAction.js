import axios from "axios";
import {
  CLIENT_VALIDATION_REQUEST,
  CLIENT_VALIDATION_SUCCESS,
  CLIENT_VALIDATION_FAILURE,
} from "../types/clientValidationType";
  import dotenv from "dotenv"
  dotenv.config()
export const clientValidationAction = (details,auth) => async (dispatch) => {
  try {
    dispatch(clientValidationRequest());
  
    const  {benePhone}=details
    const {password}=auth
    const {username}=auth
  
 const Url=process.env.REACT_APP_BASE_URL+`/api/agent/user/rest/v.4.14.01/user-validation?useridentify=${benePhone}`;

 let basicAuth='Basic ' + btoa(username + ':' + password);
   
 var config = {
   method: 'get',
   url: Url,
   headers: { 
     'Authorization': `${basicAuth}`
   }
 };
 
 const res = await axios(config)
console.log("response:",res)
   
      if(res.data.responseCode===100){
        dispatch(clientValidationSuccess(res.data));
      }  
      else if(res.data.responseCode===104){
        dispatch(clientValidationFailure(res.data.codeDescription));
      }
      else{
      //  let errMsg=res.data.data.reason
        dispatch(clientValidationFailure("Failed, Please try again later."));
      }
  } catch (err) {
    if (err.response) {
   let errorMessage = ''
       errorMessage="Something went wrong,Please try again later."
       // errorMessage=await err.response.data.message
        dispatch(clientValidationFailure(errorMessage));
    } else {
      dispatch(clientValidationFailure("The service is currently not available"));
    }
  }
};

export const clientValidationRequest = () => {
  return {
    type:  CLIENT_VALIDATION_REQUEST,
  };
};

export const clientValidationSuccess = (details) => {
  return {
    type:  CLIENT_VALIDATION_SUCCESS,
    payload: details,
  };
};
export const clientValidationFailure = (error) => {
  return {
    type:  CLIENT_VALIDATION_FAILURE,
    payload: error,
  };
};