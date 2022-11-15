import axios from "axios";
import {
    GET_RNIT_DETAILS_REQUEST,
    GET_RNIT_DETAILS_SUCCESS,
    GET_RNIT_DETAILS_FAILURE,
  } from "../types/getRnitIdentificationDetailsType";
 


export const getRnitDetailsAction = (identityNumber) => async (dispatch) => {
  try {
    dispatch(getRnitDetailsRequest());
  
    //const encodedBase64Token = Buffer.from(`${username}:${password}`).toString('base64');
   // let basicAuth='Basic ' + btoa(username + ':' + password);
    const Url='https://agentapi.mobicash.rw/api/agent/goverment-services/rnit/rest/v.4.14.01/identification-validation';
   const res = await axios.get(Url,{
   params:{identification:identityNumber}
   }, {
    // withCredentials: true,
    headers:{
    "Accept":"application/json",
    "Content-Type": "application/json",
  //'Authorization': + basicAuth,
 }
   });
  
      if(res.data.responseCode===100){
        dispatch(getRnitDetailsSuccess(res.data));
      }  
      if(res.data.responseCode===105){
        let errorMessage = res.data.codeDescription
        dispatch(getRnitDetailsFailure(errorMessage));
      }  
   
  } catch (err) {
    if (err.response) {
      let errorMessage = ''
        errorMessage="Something went wrong, Please try again later."
        dispatch(getRnitDetailsFailure(errorMessage));
      
    } else {
      dispatch(getRnitDetailsFailure("Network Error"));
    }
  }
};

export const getRnitDetailsRequest = () => {
  return {
    type: GET_RNIT_DETAILS_REQUEST,
  };
};

export const getRnitDetailsSuccess = (details) => {
  return {
    type: GET_RNIT_DETAILS_SUCCESS,
    payload: details,
  };
};
export const getRnitDetailsFailure = (error) => {
  return {
    type: GET_RNIT_DETAILS_FAILURE,
    payload: error,
  };
};