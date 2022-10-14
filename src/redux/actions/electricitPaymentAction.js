import axios from "axios";
import {
    ELECTRICITY_PAYMENT_REQUEST,
    ELECTRICITY_PAYMENT_SUCCESS,
    ELECTRICITY_PAYMENT_FAILURE,
  } from "../types/electricityPaymentType";
  
export const rraPayamentAction = (details,username,password) => async (dispatch) => {
  try {
    dispatch(rraPaymentRequest());
    const {bankName}=details
    const {rraRef}=details
    const {tin}=details
    const {taxPayerName}=details
    const {taxTypeDesc}=details
    const {taxCenterNo}=details
    const {taxTypeNo}=details
    const {assessNo}=details
    const {rraOrginNo}=details
    const {amountToPay}=details
    const {descId}=details
    const {payerPhoneNumber}=details
    const {brokering}=details
    const {userGroup}=details

  console.log(" rra details:",details,username,password)
    //const encodedBase64Token = Buffer.from(`${username}:${password}`).toString('base64');
    let basicAuth='Basic ' + btoa(username + ':' + password);
    const Url='https://agentapi.mobicash.rw/api/agent/vas/electricity/rest/v.4.14.01/payment';
    const res = await axios.post(Url,{
        
            amount:"1000",
            payerName:"MUKARUZIGA JUDITH",
            payerPhone:"0788529611",        
            taxIdentificationNumber:"120292929",
            meterNumber:"04228927150",
            agentCategory:userGroup
             
          
        // userGroup:"retail_agents",
        // brokering:"Broker"
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
       await dispatch(rraPaymentSuccess(data));
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
        dispatch(rraPaymentFailure(errorMessage)); 
    } else {
      dispatch(rraPaymentFailure("Network Error"));
    }
  }
};

export const rraPaymentRequest = () => {
  return {
    type: ELECTRICITY_PAYMENT_REQUEST,
  };
};

export const rraPaymentSuccess = (details) => {
  return {
    type: ELECTRICITY_PAYMENT_SUCCESS,
    payload: details,
  };
};
export const rraPaymentFailure = (error) => {
  return {
    type: ELECTRICITY_PAYMENT_FAILURE,
    payload: error,
  };
};