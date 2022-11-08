import axios from "axios";
import {
    LTSS_PAYMENT_REQUEST,
    LTSS_PAYMENT_SUCCESS,
    LTSS_PAYMENT_FAILURE,
  } from "../types/ltssPaymentType";
  


export const ltssPaymentAction = (details,username,password) => async (dispatch) => {
  try {
    dispatch(ltssPaymentRequest());
    const {identification}=details
    const {amountPaid}=details
    const {payerPhoneNumber}=details
    const {payerName}=details
    const {agentCategory}=details
    const {brokering}=details
    //const encodedBase64Token = Buffer.from(`${username}:${password}`).toString('base64');
    let basicAuth='Basic ' + btoa(username + ':' + password);
    const Url='https://agentapi.mobicash.rw/api/agent/goverment-services/ltss/rest/v.4.14.01/payment';
    const res = await axios.post(Url,{
      
            identification:identification, 
            amount:amountPaid,
            payerPhone:payerPhoneNumber,
            payerName:payerName,
            brokering:brokering,
            userGroup:agentCategory
            
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
       await dispatch(ltssPaymentSuccess(data));
      }
      
  } catch (err) {
    if (err.response) {
       let errorMessage = 'Invalid Crendentials'
        dispatch(ltssPaymentFailure(errorMessage)); 
    } else {
      dispatch(ltssPaymentFailure("Network Error"));
    }
  }
};

export const ltssPaymentRequest = () => {
  return {
    type: LTSS_PAYMENT_REQUEST,
  };
};

export const ltssPaymentSuccess = (details) => {
  return {
    type: LTSS_PAYMENT_SUCCESS,
    payload: details,
  };
};
export const ltssPaymentFailure = (error) => {
  return {
    type: LTSS_PAYMENT_FAILURE,
    payload: error,
  };
};