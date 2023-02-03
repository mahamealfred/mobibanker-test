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
 const Url='https://agencyapi.mobicash.rw/api/agent/utilities/user/rest/v.4.14.01/gt-bank-nid-validation';
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
      //  let errMsg=res.data.data.reason
        dispatch(valiateNidDetailsFailure(res.data.codeDescription));
      }
  } catch (err) {
    if (err.response) {
   let errorMessage = ''
       errorMessage="Something went wrong,Please try again later."
       // errorMessage=await err.response.data.message
        dispatch(valiateNidDetailsFailure(errorMessage));
    } else {
      dispatch(valiateNidDetailsFailure("The service is currently not available"));
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