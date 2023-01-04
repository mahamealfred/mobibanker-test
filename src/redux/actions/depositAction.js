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
    // const {destination}=details
    const  {debit}=details
    const {credit}=details
    const {phone}=details
    const {accountName}=details
    console.log("all data",amount,debit,credit)
    // const {brokering}=details
    // const {userGroup}=details
  //  let basicAuth='Basic ' + btoa(username + ':' + password);
    const Url='https://agencyapi.mobicash.rw/api/banking/finance/rest/v.4.14.01/gt-bank-deposit';
    const res = await axios.post(Url,{
        debit: debit,
        credit: credit,
        amount: amount,
        depositorname:accountName,
        depositoraccount:debit,
        depositorphonenumber:phone,
        destination: "INT"
      //  userGroup:userGroup,
      //  brokering:brokering
        
   },{
    withCredentials: true,
    headers:{
    "Accept":"application/json",
    "Content-Type": "application/json",
   // 'Authorization': + basicAuth,
 },
 auth: {
  username,
  password
}
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
      dispatch(depositFailure("The service is currently not available"));
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