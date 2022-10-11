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
  console.log("o new c ",oldPassword,password,confirmPassword,username);
    //const encodedBase64Token = Buffer.from(`${username}:${password}`).toString('base64');
    //let basicAuth='Basic ' + btoa(username + ':' + password);
    const Url='https://agentapi.mobicash.rw/api/agent/user/rest/v.4.14.01/change-password';
   const res = await axios.post(Url,{
    oldPassword:oldPassword,
    newPassword:password,
    newPasswordConfirmation:confirmPassword
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
    const {data} = await res;
      if(res.data.responseCode===200){
        dispatch(changePasswordSuccess(data));
          // localStorage.removeItem("mobicashAuth");
          //  sessionStorage.removeItem("mobicash-auth")
          // history.push('/',{push:true})
          // window.location.reload(true);

      }
      
   
  } catch (err) {
    if (err.response) {
      
      const errorMessage = 'Please provide valid Pin'
       // errorMessage=await err.response.data.message
        dispatch(changePasswordFailure(errorMessage));
      
    } else {
      dispatch(changePasswordFailure("Network Error"));
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