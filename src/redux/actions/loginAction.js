import axios from "axios";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
  } from "../types/loginType";

import jwt from "jsonwebtoken";


export const loginAction = (user,history) => async (dispatch) => {
 
  try {
    dispatch(loginRequest());
    const {username}=user
    const {password}=user 
    const basicAuth = Buffer.from(`${username}:${password}`).toString('base64');
    //let basicAuth='Basic ' + Btoa(username + ':' + password);
    //const Url='https://agentweb.mobicash.rw/api/agent/user/rest/v.4.14.01/auth';
   const Url='https://agentapi.mobicash.rw/api/agent/user/rest/v.4.14.01/auth';
  // const Url=process.env.REACT_APP_BASE_URL+'/user/rest/v.4.14.01/auth' 
   const res = await axios.post(Url,{}, {
      withCredentials: true,
    Headers:{
    "Accept":"application/json",
    "Content-Type": "application/json",
  //'Authorization': + basicAuth,
  // 'Authorization': `Basic ${basicAuth}`
  },
  auth: {
    username,
    password
  }
   });

    const jwt_secret="tokensecret"
    if(res.data.responseCode===100){
      const userId=res.data.data.id
      const name=res.data.data.names
      const role=res.data.data.brokering
      const group=res.data.data.group
      const claims={userId,name,role,username,group,password,basicAuth}
      const token= jwt.sign(claims,jwt_secret, { expiresIn: "7d"});
      dispatch(loginSuccess(res.data));
       history.push('/dashboard',{push:true})
      sessionStorage.setItem('mobicash-auth',token)
      return localStorage.setItem('mobicashAuth',token);
    }
    if(res.data.responseCode===103 || res.data.responseCode===102 || res.data.responseCode===105 || res.data.responseCode===106 || res.data.responseCode===107){
      dispatch(loginFailure(res.data.codeDescription));
    }
  } catch (err) {
    if (err.response) {
     const errorMessage = "Something went wrong,Please try again later.";
      dispatch(loginFailure(errorMessage));
   
    } else {
      dispatch(loginFailure("Network Error"));
    }
  }
};

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const loginSuccess = (users) => {
  return {
    type: LOGIN_SUCCESS,
    payload: users,
  };
};
export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
};