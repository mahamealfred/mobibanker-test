import axios from "axios";
import {
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILURE,
  } from "../types/changePasswordType";
  
  import dotenv from "dotenv";
  dotenv.config();
export const changePasswordAction = (user,username) => async (dispatch) => {
  try {
    dispatch(changePasswordRequest());
    const {oldPassword}=user 
    const {password}=user
    const {confirmPassword}=user
    //const encodedBase64Token = Buffer.from(`${username}:${password}`).toString('base64');
    //let basicAuth='Basic ' + btoa(username + ':' + password);
    const Url='https://agentapi.mobicash.rw/api/agent/user/rest/v.4.14.01/change-password';
   const res = await axios.post(Url,{
    oldPassword:oldPassword.toString(),
    newPassword:password.toString(),
    newPasswordConfirmation:confirmPassword.toString()
   },{
    withCredentials: true,
    headers:{
    "Accept":"application/json",
    "Content-Type": "application/json",
    // 'Authorization': + basicAuth,
 },
  auth: {
    username,
    password:oldPassword
  }
   });
      if(res.data.responseCode===100){
        dispatch(changePasswordSuccess(res.data));
      }
      if(res.data.responseCode===103 || res.data.responseCode===104 || res.data.responseCode===103 || res.data.responseCode===105 || res.data.responseCode===107 ){
        dispatch(changePasswordFailure(res.data.codeDescription));
      }
      
  } catch (err) {
    if (err.response) {
      const errorMessage = 'Something went wrong, Please try again later'
        dispatch(changePasswordFailure(errorMessage));
      
    } else {
      dispatch(changePasswordFailure("The service is currently not available"));
    }
  }
};

export const changePasswordRequest = () => {
  return {
    type: CHANGE_PASSWORD_REQUEST,
  };
};

export const changePasswordSuccess = (details) => {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    payload: details,
  };
};
export const changePasswordFailure = (error) => {
  return {
    type: CHANGE_PASSWORD_FAILURE,
    payload: error,
  };
};