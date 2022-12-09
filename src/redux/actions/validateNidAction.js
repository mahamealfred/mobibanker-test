import axios from "axios";
import {
    VALIDATE_NID_REQUEST,
    VALIDATE_NID_SUCCESS,
    VALIDATE_NID_FAILURE,
  } from "../types/validateNidType";
  
export const valiateNidDetailsDetailsAction = (details) => async (dispatch) => {
  try {
    dispatch(valiateNidDetailsRequest());
    const  {nid}=details
 const Url='https://agentapi.mobicash.rw/api/agent/goverment-services/cbhi/rest/v.4.14.01/nid-validation';
   const res = await axios.get(Url,{
    params:{
        nid:nid
    }
   }, {
    // withCredentials: true,
    headers:{
    "Accept":"application/json",
    "Content-Type": "application/json"
 },
   });
      if(res.data.responseCode===100){
        dispatch(valiateNidDetailsSuccess(res.data));
      }  
      else{
        let errMsg=res.data.codeDescription
        dispatch(valiateNidDetailsFailure(errMsg));
      }
  } catch (err) {
    if (err.response) {
   let errorMessage = ''
       errorMessage="Something went wrong,Please try again later."
       // errorMessage=await err.response.data.message
        dispatch(valiateNidDetailsFailure(errorMessage));
      
    } else {
      dispatch(valiateNidDetailsFailure("Network Error"));
    }
  }
};

export const valiateNidDetailsRequest = () => {
  return {
    type: VALIDATE_NID_REQUEST,
  };
};

export const valiateNidDetailsSuccess = (details) => {
  return {
    type: VALIDATE_NID_SUCCESS,
    payload: details,
  };
};
export const valiateNidDetailsFailure = (error) => {
  return {
    type: VALIDATE_NID_FAILURE,
    payload: error,
  };
};