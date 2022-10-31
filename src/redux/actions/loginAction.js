import axios from "axios";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
  } from "../types/loginType";

import jwt from "jsonwebtoken";
//   import dotenv from "dotenv";
//   dotenv.config();
require('dotenv').config();
// const  {REACT_APP_BASE_URL} = process.env

export const loginAction = (user,history) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const {username}=user
    const {password}=user 
    const basicAuth = Buffer.from(`${username}:${password}`).toString('base64');
    //let basicAuth='Basic ' + Btoa(username + ':' + password);
    //const Url='https://agentweb.mobicash.rw/api/agent/user/rest/v.4.14.01/auth';
    const Url='https://agentapi.mobicash.rw/api/agent/user/rest/v.4.14.01/auth';
    //const Url='https://agentweb.mobicash.rw/api/agent/user/rest/v.4.14.01/auth';
    // console.log("base url",process.env.REACT_APP_BASE_URL)
    //const Url=REACT_APP_BASE_URL+'/user/rest/v.4.14.01/auth';
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
    const {data} = await res;
    const jwt_secret="tokensecret"
    if(res.data.code===200){
      const userId=res.data.id
      const name=res.data.display
      const role=res.data.brokering
      const group=res.data.group
      const claims={userId,name,role,username,group,password,basicAuth}
      const token= jwt.sign(claims,jwt_secret, { expiresIn: "7d"});
      dispatch(loginSuccess(data));
       history.push('/dashboard',{push:true})
      sessionStorage.setItem('mobicash-auth',token)
      return localStorage.setItem('mobicashAuth',token);
    }
  } catch (err) {
    if (err.response) {
     const errorMessage = await err.response.data.responseMessage;
     if(errorMessage==="login"){
      dispatch(loginFailure("Invalid credentials,Please provide a valid Username and Password"));
     }else{
      dispatch(loginFailure("You're temporaly blocked"));
     }
      
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