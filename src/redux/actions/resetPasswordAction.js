import axios from "axios";
import {
    RESETPASSWORD_REQUEST,
    RESETPASSWORD_SUCCESS,
    RESETPASSWORD_FAILURE,
  } from "../types/resetPasswordType";
  
  import dotenv from "dotenv";
  dotenv.config();
export const resetPasswordAction = (user,history) => async (dispatch) => {
    
  try {
    dispatch(resetPasswordRequest());
    const {username}=user 
    const {code}=user
    const {password}=user
    const {cpassword}=user
    const Url='https://agentapi.mobicash.rw/api/agent/user/rest/v.4.14.01/forgetten-password-change';
   const res = await axios.post(Url,{
    user:username,
    code:code,
    newPassword:password,
    newPasswordConfirmation:cpassword
   },{
    withCredentials: true,
    headers:{
    "Accept":"application/json",
    "Content-Type": "application/json",
 }
   });
      if(res.data.responseCode===100){
        dispatch(resetPasswordSuccess(res.data));
      }
      if(res.data.responseCode===103 || res.data.responseCode===107 || res.data.responseCode===105 ){
        dispatch(resetPasswordFailure(res.data.codeDescription));
      }  
  } catch (err) {
    if (err.response) {
      const errorMessage = 'Something went wrong, Please try again later'
        dispatch(resetPasswordFailure(errorMessage));
      
    } else {
      dispatch(resetPasswordFailure("The service is currently not available"));
    }
  }
};

export const resetPasswordRequest = () => {
  return {
    type: RESETPASSWORD_REQUEST,
  };
};

export const resetPasswordSuccess = (details) => {
  return {
    type: RESETPASSWORD_SUCCESS,
    payload: details,
  };
};
export const resetPasswordFailure = (error) => {
  return {
    type: RESETPASSWORD_FAILURE,
    payload: error,
  };
};