import axios from "axios";
import {
    FORGOTPASSWORD_REQUEST,
    FORGOTPASSWORD_SUCCESS,
    FORGOTPASSWORD_FAILURE,
  } from "../types/forgotPasswordType";
  import jwt from "jsonwebtoken";
  import dotenv from "dotenv";
  dotenv.config();
 
export const forgotPasswordAction = (user,history) => async (dispatch) => {
  try {
    dispatch(forgotPasswordRequest());
    const {username}=user 
    
   
    //const encodedBase64Token = Buffer.from(`${username}:${password}`).toString('base64');
    //let basicAuth='Basic ' + btoa(username + ':' + password);
    const Url=process.env.REACT_APP_BASE_URL+'/api/agent/user/rest/v.4.14.01/forgetten-password-request';
    //const Url=process.env.REACT_APP_BASE_URL+'/user/rest/v.4.14.01/forgetten-password-request' 
   const res = await axios.post(Url,{
    user:username,
   },{
    withCredentials: true,
    headers:{
    "Accept":"application/json",
    "Content-Type": "application/json",
    // 'Authorization': + basicAuth,
 }
   });
   const jwt_secret="forgotpasswordtokensecret"
      if(res.data.responseCode===100){
        const claims={username}
        const token= jwt.sign(claims,jwt_secret, { expiresIn: "1d"});
        sessionStorage.setItem('FUPR/MOBICORE/AUTH',token)
        dispatch(forgotPasswordSuccess(res.data));
        history.push('/reset-pin',{push:true})
      }
      if(res.data.responseCode===103 || res.data.responseCode===107 ){
        dispatch(forgotPasswordFailure(res.data.codeDescription));
      }
      if(res.data.responseCode===105){
        dispatch(forgotPasswordFailure(res.data.codeDescription));
      }
      
  } catch (err) {
    if (err.response) {
      const errorMessage = 'Something went wrong, Please try again later'
        dispatch(forgotPasswordFailure(errorMessage));
    } else {
      dispatch(forgotPasswordFailure("The service is currently not available"));
    }
  }
};

export const forgotPasswordRequest = () => {
  return {
    type: FORGOTPASSWORD_REQUEST,
  };
};

export const forgotPasswordSuccess = (details) => {
  return {
    type: FORGOTPASSWORD_SUCCESS,
    payload: details,
  };
};
export const forgotPasswordFailure = (error) => {
  return {
    type: FORGOTPASSWORD_FAILURE,
    payload: error,
  };
};