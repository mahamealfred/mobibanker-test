import axios from "axios";
import {
    RNIT_PAYMENT_REQUEST,
    RNIT_PAYMENT_SUCCESS,
    RNIT_PAYMENT_FAILURE,
  } from "../types/rnitPaymentType";
  
  import dotenv from "dotenv"
  dotenv.config()

export const rnitPaymentAction = (details,username,password,history) => async (dispatch) => {
  try {
    dispatch(rnitPaymentRequest());
 const {userGroup}=details
 const {bankName}=details
 const {bankAccount}=details
 const {payerNid}=details
 const  {amountToPay}=details
 const  {payerName}=details
 const {payerPhoneNumber}=details
 const {payerEmail}=details
 const {brokering}=details

    //const encodedBase64Token = Buffer.from(`${username}:${password}`).toString('base64');
    let basicAuth='Basic ' + btoa(username + ':' + password);
    const Url=process.env.REACT_APP_BASE_URL+'/api/agent/goverment-services/rnit/rest/v.4.14.01/payment';
    const res = await axios.post(Url,{
         nid:payerNid.replaceAll(/\s/g, ''),
       // nid:payerNid.join(""),
        amount:amountToPay,
        bankAccount:bankAccount,
        payerName:payerName,
        bankName:bankName,
        payerPhone:payerPhoneNumber,
        payerEmail:payerEmail,
        brokering:brokering,
        userGroup:userGroup
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
       await dispatch(rnitPaymentSuccess(res.data));
      }
      if(res.data.responseCode===102 || res.data.responseCode===103 || res.data.responseCode===105 || res.data.responseCode===106 ||res.data.responseCode===107){
        let errorMessage = res.data.codeDescription
          dispatch(rnitPaymentFailure(errorMessage)); 
      }
      
      
  } catch (err) {
    if (err.response) {
       let errorMessage = 'Something went wrong, Please try again later.'
        dispatch(rnitPaymentFailure(errorMessage)); 
    } else {
      dispatch(rnitPaymentFailure("The service is currently not available"));
    }
  }
};

export const rnitPaymentRequest = () => {
  return {
    type: RNIT_PAYMENT_REQUEST,
  };
};

export const rnitPaymentSuccess = (details) => {
  return {
    type: RNIT_PAYMENT_SUCCESS,
    payload: details,
  };
};
export const rnitPaymentFailure = (error) => {
  return {
    type: RNIT_PAYMENT_FAILURE,
    payload: error,
  };
};