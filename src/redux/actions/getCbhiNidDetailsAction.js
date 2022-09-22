import axios from "axios";
import {
    GET_CBHI_NID_DETAILS_REQUEST,
    GET_CBHI_NID_DETAILS_SUCCESS,
    GET_CBHI_NID_DETAILS_FAILURE,
  } from "../types/getCbhiNidDetailsType";
  
export const getCbhiNidDetailsAction = (details,history) => async (dispatch) => {
  try {
    dispatch(getCbhiNidDetailsRequest());
    const  {nid}=details
    const  {year}=details
    //const encodedBase64Token = Buffer.from(`${username}:${password}`).toString('base64');
   // let basicAuth='Basic ' + btoa(username + ':' + password);
  //const Url='https://agentweb.mobicash.rw/api/agent/goverment-services/cbhi/rest/v.4.14.01/nid-validation';
  const Url='https://agentapi.mobicash.rw/api/agent/goverment-services/cbhi/rest/v.4.14.01/nid-validation';
   const res = await axios.post(Url,{
    houseHoldNID:nid,
    paymentYear:year
   }, {
    // withCredentials: true,
    headers:{
    "Accept":"application/json",
    "Content-Type": "application/json",
  //'Authorization': + basicAuth,
 },
   });
    const {data} = await res;
      if(res.data.responsecode===200){
        dispatch(getCbhiNidDetailsSuccess(data));
      }else if(res.data.responsecode===400){
        let errMsg=res.data.response.message
        dispatch(getCbhiNidDetailsFailure(errMsg));
      }
  } catch (err) {
    if (err.response) {
   let errorMessage = ''
       errorMessage="Invalid input, HeadId or Year of payment is invalid "
       // errorMessage=await err.response.data.message
        dispatch(getCbhiNidDetailsFailure(errorMessage));
      
    } else {
      dispatch(getCbhiNidDetailsFailure("Network Error"));
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