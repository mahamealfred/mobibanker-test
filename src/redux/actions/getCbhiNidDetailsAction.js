import axios from "axios";
import {
    GET_CBHI_NID_DETAILS_REQUEST,
    GET_CBHI_NID_DETAILS_SUCCESS,
    GET_CBHI_NID_DETAILS_FAILURE,
  } from "../types/getCbhiNidDetailsType";
import dotenv from "dotenv";
dotenv.config()
export const getCbhiNidDetailsAction = (details,history) => async (dispatch) => {
  try {
    dispatch(getCbhiNidDetailsRequest());
    const  {nid}=details
    const  {year}=details
    
    //const encodedBase64Token = Buffer.from(`${username}:${password}`).toString('base64');
   // let basicAuth='Basic ' + btoa(username + ':' + password);
  //const Url='https://agentweb.mobicash.rw/api/agent/goverment-services/cbhi/rest/v.4.14.01/nid-validation';
 const Url=process.env.REACT_APP_BASE_URL+'/api/agent/goverment-services/cbhi/rest/v.4.14.01/nid-validation';
   const res = await axios.get(Url,{
    params:{
      houseHoldNID:nid,
      paymentYear:year
    }
   }, {
    // withCredentials: true,
    headers:{
    "Accept":"application/json",
    "Content-Type": "application/json",
  //'Authorization': + basicAuth,
 },
   });
      if(res.data.responseCode===100){
        dispatch(getCbhiNidDetailsSuccess(res.data));
      }  
      else if(res.data.responseCode===105){
        let errMsg=res.data.data.houseHoldNID[0]
        dispatch(getCbhiNidDetailsFailure(errMsg));
      }
      else{
        let errMsg=res.data.codeDescription
        dispatch(getCbhiNidDetailsFailure(errMsg));
      }
  } catch (err) {
    if (err.response) {
   let errorMessage = ''
       errorMessage="Something went wrong,Please try again later."
       // errorMessage=await err.response.data.message
        dispatch(getCbhiNidDetailsFailure(errorMessage));
      
    } else {
      dispatch(getCbhiNidDetailsFailure("The service is currently not available"));
    }
  }
};

export const getCbhiNidDetailsRequest = () => {
  return {
    type: GET_CBHI_NID_DETAILS_REQUEST,
  };
};

export const getCbhiNidDetailsSuccess = (details) => {
  return {
    type: GET_CBHI_NID_DETAILS_SUCCESS,
    payload: details,
  };
};
export const getCbhiNidDetailsFailure = (error) => {
  return {
    type: GET_CBHI_NID_DETAILS_FAILURE,
    payload: error,
  };
};