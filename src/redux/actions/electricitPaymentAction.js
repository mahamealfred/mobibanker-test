import axios from "axios";
import {
    ELECTRICITY_PAYMENT_REQUEST,
    ELECTRICITY_PAYMENT_SUCCESS,
    ELECTRICITY_PAYMENT_FAILURE,
  } from "../types/electricityPaymentType";
  
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

  console.log(" electricity details:",details,username,password)
    //const encodedBase64Token = Buffer.from(`${username}:${password}`).toString('base64');
    let basicAuth='Basic ' + btoa(username + ':' + password);
    const Url='https://agentapi.mobicash.rw/api/agent/vas/electricity/rest/v.4.14.01/payment';
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
    const {data} = await res;
      if(res.data.responseCode===200){
       await dispatch(electricityPaymentSuccess(data));
      }
  
      
  } catch (err) {
    if (err.response) {
       // const errorMessage = await err.response;
       let errorMessage = 'Invalid Crendentials'
      //   errorMessage="Please provide valid Pin"
     // const errorMessage = 'Error'
      // errorMessage=await err.response.data.message
        dispatch(electricityPaymentFailure(errorMessage)); 
    } else {
      dispatch(electricityPaymentFailure("Network Error"));
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