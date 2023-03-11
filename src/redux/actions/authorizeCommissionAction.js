import axios from "axios";
import {
    AUTHORIZE_COMMISSION_REQUEST,
    AUTHORIZE_COMMISSION_SUCCESS,
    AUTHORIZE_COMMISSION_FAILURE,
  } from "../types/authorizeCommissionType";
  import dotenv from "dotenv"
  dotenv.config()
export const authorizeCommissionAction = (amount,auth,password) => async (dispatch) => {
  const {username}=auth
  try {
    dispatch(authorizeCommissionRequest());
    let basicAuth='Basic ' + btoa(username + ':' + password);
    const Url=process.env.REACT_APP_BASE_URL+'/api/agent/utilities/user/rest/v.4.14.01/commission-selfserve';
    const res = await axios.post(Url,{
amount:"100"
   },{
    withCredentials: true,
    headers:{
    "Accept":"application/json",
    "Content-Type": "application/json",
    'Authorization': + basicAuth,
 },
  auth: {
    username,
    password
  }
   });

      if(res.data.responseCode===100){
        dispatch(authorizeCommissionSuccess(res.data));
      }  
      else{
        dispatch(authorizeCommissionFailure(res.data.codeDescription));
      }
  } catch (err) {
    if (err.response) {
      const errorMessage = 'Transaction Failed'
        dispatch(authorizeCommissionFailure(errorMessage));
      
    } else {
      dispatch(authorizeCommissionFailure("The service is currently not available"));
    }
  }
};

export const authorizeCommissionRequest = () => {
  return {
    type: AUTHORIZE_COMMISSION_REQUEST,
  };
};

export const authorizeCommissionSuccess = (details) => {
  return {
    type: AUTHORIZE_COMMISSION_SUCCESS,
    payload: details,
  };
};
export const authorizeCommissionFailure = (error) => {
  return {
    type: AUTHORIZE_COMMISSION_FAILURE,
    payload: error,
  };
};