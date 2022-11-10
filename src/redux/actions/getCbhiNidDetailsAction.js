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
 // const Url='https://agentapi.mobicash.rw/api/agent/goverment-services/cbhi/rest/v.4.14.01/nid-validation';
//    const res = await axios.get(Url,{
//     houseHoldNID:nid,
//     paymentYear:year
//    }, {
//     // withCredentials: true,
//     headers:{
//     "Accept":"application/json",
//     "Content-Type": "application/json",
//   //'Authorization': + basicAuth,
//  },
//    });

var data = JSON.stringify({
  "houseHoldNID": "1195080032745065",
  "paymentYear": "2022"
});

var config = {
  method: 'get',
  url: 'https://agentapi.mobicash.rw/api/agent/goverment-services/cbhi/rest/v.4.14.01/nid-validation',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

const res =await axios(config)
   console.log("year and nid",nid,year)
   console.log("response...",res.data)
      if(res.data.responseCode===100){
        dispatch(getCbhiNidDetailsSuccess(res.data));
      }  
      else if(res.data.responseCode===104){
        let errMsg=res.data.codeDescription
        dispatch(getCbhiNidDetailsFailure(errMsg));
      }
  } catch (err) {
    if (err.response) {
      console.log("error message",err)
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