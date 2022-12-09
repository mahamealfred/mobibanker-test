import axios from "axios";
import {
    DEPOSIT_REQUEST,
    DEPOSIT_SUCCESS,
    DEPOSIT_FAILURE,
  } from "../types/depositType";
  


export const depositAction = (details,username,password) => async (dispatch) => {
  try {
    dispatch(depositRequest());
    const {amount}=details
    const {destination}=details
    const  {debit}=details
    const {credit}=details
    console.log("all data",amount,destination,debit,credit)
    // const {brokering}=details
    // const {userGroup}=details
  //  let basicAuth='Basic ' + btoa(username + ':' + password);
    const Url='http://agencyapi.mobicash.rw/api/banking/finance/rest/v.4.14.01/gt-bank-deposit';
    const res = await axios.post(Url,{
       debit:debit,
       credit:credit,
       amount:amount,
       reference: "string",
       message: "string",
       destination:destination
    //    userGroup:userGroup,
    //    brokering:brokering
        
   },{
    withCredentials: true,
    headers:{
    "Accept":"application/json",
    "Content-Type": "application/json",
   // 'Authorization': + basicAuth,
 },
 
   });
   
      if(res.data.responseCode===100){
       await dispatch(depositSuccess(res.data));
      }
      else{
        await dispatch(depositFailure(res.data.codeDescription));
       }
   
  } catch (err) {
    if (err.response) {
       let errorMessage = 'Something went wrong, Please try again.'
        dispatch(depositFailure(errorMessage)); 
    } else {
      dispatch(depositFailure("Network Error"));
    }
  }
};

export const depositRequest = () => {
  return {
    type: DEPOSIT_REQUEST,
  };
};

export const depositSuccess = (details) => {
  return {
    type: DEPOSIT_SUCCESS,
    payload: details,
  };
};
export const depositFailure = (error) => {
  return {
    type: DEPOSIT_FAILURE,
    payload: error,
  };
};