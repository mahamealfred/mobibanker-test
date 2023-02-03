import axios from "axios";

import {
    GET_LTSSID_DETAILS_REQUEST,
    GET_LTSSID_DETAILS_SUCCESS,
    GET_LTSSID_DETAILS_FAILURE,
  } from "../types/getLtssIdentificationDetailsType";
  
  import dotenv from "dotenv"
  dotenv.config()
export const getLtssIdDetailsAction = (details,history) => async (dispatch) => {
  try {
    dispatch(getLtssIdDetailsRequest());
    const identificationId=details.identificationId
    const Url =process.env.REACT_APP_BASE_URL+'/api/agent/goverment-services/ltss/rest/v.4.14.01/identification-validation'

   const res = await axios.get(Url,{
    params:{
      identification:identificationId
    }
   }, {
    withCredentials: true,
    headers:{
      "Accept":"application/json",
    "Content-Type": "application/json",
  },
   });
 
    if(res.data.responseCode===100){
      dispatch(getLtssIdDetailsSuccess(res.data));
    }
    if(res.data.responseCode===104 || res.data.responseCode===105){
        dispatch(getLtssIdDetailsFailure(res.data.codeDescription));
      }
  } catch (err) {
    if (err.response) {
      let errorMessage="Something went wrong, Please try again later."
      dispatch(getLtssIdDetailsFailure(errorMessage));
    }
  }
};

export const getLtssIdDetailsRequest = () => {
  return {
    type:  GET_LTSSID_DETAILS_REQUEST,
  };
};

export const getLtssIdDetailsSuccess = (details) => {
  return {
    type:  GET_LTSSID_DETAILS_SUCCESS,
    payload: details,
  };
};
export const getLtssIdDetailsFailure = (error) => {
  return {
    type:  GET_LTSSID_DETAILS_FAILURE,
    payload: error,
  };
};