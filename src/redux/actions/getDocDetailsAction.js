import axios from "axios";

import {
    GET_DOC_DETAILS_REQUEST,
    GET_DOC_DETAILS_SUCCESS,
    GET_DOC_DETAILS_FAILURE,
  } from "../types/getDocDetailsType";
  

export const getDocDetailsAction = (details,history) => async (dispatch) => {
  try {
    dispatch(getDocDetailsRequest());
    const docId=details.docId
   // const Url ='https://agentweb.mobicash.rw/api/agent/goverment-services/rra/rest/v.4.14.01/doc-id-validation'
    const Url='https://agentapi.mobicash.rw/api/agent/goverment-services/rra/rest/v.4.14.01/doc-id-validation';
// const res = await axios.post(Url,{
// details
// });
   const res = await axios.get(Url,{
   params:{ rra_doc_id_ref:docId },
   }, {
    withCredentials: true,
    headers:{
      "Accept":"application/json",
    "Content-Type": "application/json",
  },
   });
    
    if(res.data.responseCode===100){
     await dispatch(getDocDetailsSuccess(res.data));
    }
    else{
      await dispatch(getDocDetailsFailure(res.data.codeDescription));
     }
  } catch (err) {
    if (err.response) {
      const errorMessage = "Something went wrong, Please try again later."
      dispatch(getDocDetailsFailure(errorMessage));
    } else {
      dispatch(getDocDetailsFailure("The service is currently not available"));
    }
  }
};

export const getDocDetailsRequest = () => {
  return {
    type:  GET_DOC_DETAILS_REQUEST,
  };
};

export const getDocDetailsSuccess = (details) => {
  return {
    type:  GET_DOC_DETAILS_SUCCESS,
    payload: details,
  };
};
export const getDocDetailsFailure = (error) => {
  return {
    type:  GET_DOC_DETAILS_FAILURE,
    payload: error,
  };
};