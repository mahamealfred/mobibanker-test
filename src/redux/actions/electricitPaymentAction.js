import axios from "axios";
import {
    ELECTRICITY_PAYMENT_REQUEST,
    ELECTRICITY_PAYMENT_SUCCESS,
    ELECTRICITY_PAYMENT_FAILURE,
  } from "../types/electricityPaymentType";
  import dotenv from "dotenv"
  dotenv.config()
export const electricityPayamentAction = (details,username,password) => async (dispatch) => {
  try {
    dispatch(electricityPaymentRequest());
   const {amount}=details;
   const {payerName}=details;
   const {taxIdentificationNumber}=details;
   const {payerPhoneNumber}=details;
   const {meterNumber}=details;
   const {brokering}=details
   const {userGroup}=details
    //const encodedBase64Token = Buffer.from(`${username}:${password}`).toString('base64');
    let basicAuth='Basic ' + btoa(username + ':' + password);
    const Url=process.env.REACT_APP_BASE_URL+'/api/agent/vas/electricity/rest/v.4.14.01/payment';
    const res = await axios.post(Url,{
            amount:amount,
            payerName:payerName,
            payerPhone:payerPhoneNumber,        
            taxIdentificationNumber:taxIdentificationNumber,
            meterNumber:meterNumber,
            userGroup:userGroup,
            brokering:brokering
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
       await dispatch(electricityPaymentSuccess(res.data));
      } 
      if(res.data.responseCode===101 || res.data.responseCode===102 || res.data.responseCode===103 || res.data.responseCode===105 || res.data.responseCode===106 ||res.data.responseCode===107){
        await dispatch(electricityPaymentFailure(res.data.codeDescription));
       }   
  } catch (err) {
    if (err.response) {
       let errorMessage = 'Something went wrong,Please try again later'
        dispatch(electricityPaymentFailure(errorMessage)); 
    } else {
      dispatch(electricityPaymentFailure("The service is currently not available"));
    }
  }
};

export const electricityPaymentRequest = () => {
  return {
    type: ELECTRICITY_PAYMENT_REQUEST,
  };
};

export const electricityPaymentSuccess = (details) => {
  return {
    type: ELECTRICITY_PAYMENT_SUCCESS,
    payload: details,
  };
};
export const electricityPaymentFailure = (error) => {
  return {
    type: ELECTRICITY_PAYMENT_FAILURE,
    payload: error,
  };
};