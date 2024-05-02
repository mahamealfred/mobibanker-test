import axios from "axios";
import {
    RIA_DEPOSIT_REQUEST,
    RIA_DEPOSIT_SUCCESS,
    RIA_DEPOSIT_FAILURE,
  } from "../types/riaDepositType";
  
  import dotenv from "dotenv"
  dotenv.config()

export const riaDepositAction = (details,username,password) => async (dispatch) => {
  try {
    dispatch(riaDepositRequest());
    const { orderNo}=details
    const { PIN}=details
    const {clientaccount}=details
    // const {brokering}=details
    // const {userGroup}=details
  //  let basicAuth='Basic ' + btoa(username + ':' + password);
    const Url='https://agentapi.mobicash.rw/api/ria/service/rest/v.4.14.01/Ria-Remitance-Order-Transfer';
    const res = await axios.post(Url,{
        orderNo:orderNo,
        PIN:PIN,
        clientaccount:clientaccount 
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
       await dispatch(riaDepositSuccess(res.data));
      }
      else if(res.data.responseCode!==100){
        await dispatch(riaDepositFailure(res.data.codeDescription)); 
      }
      else{
        await dispatch(riaDepositFailure("Failed, Please try again later."));
       }
  } catch (err) {
    if (err.response) {
       let errorMessage = 'Something went wrong, Please try again.'
        dispatch(riaDepositFailure(errorMessage)); 
    } else {
      dispatch(riaDepositFailure("The service is currently not available"));
    }
  }
};

export const riaDepositRequest = () => {
  return {
    type: RIA_DEPOSIT_REQUEST,
  };
};

export const riaDepositSuccess = (details) => {
  return {
    type: RIA_DEPOSIT_SUCCESS,
    payload: details,
  };
};
export const riaDepositFailure = (error) => {
  return {
    type: RIA_DEPOSIT_FAILURE,
    payload: error,
  };
};