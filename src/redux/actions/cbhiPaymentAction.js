import axios from "axios";
import {
    CBHI_PAYMENT_REQUEST,
    CBHI_PAYMENT_SUCCESS,
    CBHI_PAYMENT_FAILURE,
  } from "../types/cbhiPaymentType";
  
export const cbhiPayamentAction = (details,username,password,history) => async (dispatch) => {
  try {
    dispatch(cbhiPaymentRequest());
    const {houseHoldNID}=details
    const {paymentYear}=details
    const {amountPaid}=details
    const {payerName}=details
    const {houseHoldCategory}=details
    const {householdMemberNumber}=details
    const {totalPremium}=details
    const {payerPhoneNumber}=details
    const {brokering}=details
    const {userGroup}=details
 
   // let errorMessage =''
    //const encodedBase64Token = Buffer.from(`${username}:${password}`).toString('base64');
    let basicAuth='Basic ' + btoa(username + ':' + password);
    const Url='https://agentapi.mobicash.rw/api/agent/goverment-services/cbhi/rest/v.4.14.01/payment';
    const res = await axios.post(Url,{
    houseHoldNID:houseHoldNID,
    paymentYear:paymentYear,
    amountPaid:amountPaid,
    payerName:payerName,
    houseHoldCategory:houseHoldCategory,
    householdMemberNumber:householdMemberNumber,
    totalPremium:totalPremium,     
    payerPhoneNumber:payerPhoneNumber,   
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
       await dispatch(cbhiPaymentSuccess(res.data));
      }
      if(res.data.responseCode===101 || res.data.responseCode===102 || res.data.responseCode===103 || res.data.responseCode===105 || res.data.responseCode===106 ||res.data.responseCode===107){
        await dispatch(cbhiPaymentFailure(res.data.codeDescription));
       }
      
  } catch (err) {
    if (err.response) {
       let errorMessage = 'Something went wrong, Please try again later'
        dispatch(cbhiPaymentFailure(errorMessage)); 
    } else {
      dispatch(cbhiPaymentFailure("Network Error"));
    }
  }
};

export const cbhiPaymentRequest = () => {
  return {
    type: CBHI_PAYMENT_REQUEST,
  };
};

export const cbhiPaymentSuccess = (details) => {
  return {
    type: CBHI_PAYMENT_SUCCESS,
    payload: details,
  };
};
export const cbhiPaymentFailure = (error) => {
  return {
    type: CBHI_PAYMENT_FAILURE,
    payload: error,
  };
};