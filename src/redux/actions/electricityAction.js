import axios from "axios";

import {
    GET_ELECTRICITYDETAILS_REQUEST,
    GET_ELECTRICITYDETAILS_SUCCESS,
    GET_ELECTRICITYDETAILS_FAILURE,
  } from "../types/electricityType";
  
  import dotenv from "dotenv"
  dotenv.config()
export const getElectricityDetailsAction = (details) => async (dispatch) => {
  try {
    dispatch(getElectricityDetailsRequest());
    const meter=details.meterNumber
  
    const Url=process.env.REACT_APP_BASE_URL+'/api/agent/vas/electricity/rest/v.4.14.01/meter-number-validation';

   const res = await axios.get(Url,{
   params:{ meterNumber:meter},
   }, {
    withCredentials: true,
    headers:{
      "Accept":"application/json",
    "Content-Type": "application/json",
  },
   });
  
    if(res.data.responseCode===100){
     await dispatch(getElectricityDetailsSuccess(res.data)); 
    }
    if(res.data.responseCode===104 || res.data.responseCode===105){
      await dispatch(getElectricityDetailsFailure(res.data.codeDescription)); 
     }
  } catch (err) {
    if (err.response) {
      const errorMessage = "Something went wrong, Please try again later.";
      dispatch(getElectricityDetailsFailure(errorMessage));
    } else {
      dispatch(getElectricityDetailsFailure("The service is currently not available"));
    }
  }
};

export const getElectricityDetailsRequest = () => {
  return {
    type:  GET_ELECTRICITYDETAILS_REQUEST,
  };
};

export const getElectricityDetailsSuccess = (details) => {
  return {
    type:  GET_ELECTRICITYDETAILS_SUCCESS,
    payload: details,
  };
};
export const getElectricityDetailsFailure = (error) => {
  return {
    type:  GET_ELECTRICITYDETAILS_FAILURE,
    payload: error,
  };
};