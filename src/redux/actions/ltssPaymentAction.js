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
  console.log("ltss details:",details,username,password)
    //const encodedBase64Token = Buffer.from(`${username}:${password}`).toString('base64');
    let basicAuth='Basic ' + btoa(username + ':' + password);
    const Url='https://agentapi.mobicash.rw/api/agent/goverment-services/ltss/rest/v.4.14.01/payment';
    const res = await axios.post(Url,{
      
            identification:identification, 
            amount:amountPaid,
            payerPhone:payerPhoneNumber,
            payerName:payerName,
            agentCategory:agentCategory
            
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
    //   if(res.data.responseCode==400){
    //     let errorMessage = 'Invalid Credential, Please provide valid Pin'
    //       dispatch(rraPaymentFailure(errorMessage)); 
    //   }
      // else{
      //   history.push('/dashboard/cbhi',{push:true})
      // }
      
  } catch (err) {
    if (err.response) {
       // const errorMessage = await err.response;
       let errorMessage = 'Invalid Crendentials'
      //   errorMessage="Please provide valid Pin"
     // const errorMessage = 'Error'
      // errorMessage=await err.response.data.message
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