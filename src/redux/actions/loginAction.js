import axios from "axios";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
  } from "../types/loginType";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
export let refreshTokens = [];

dotenv.config()
const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, names: user.names,role:user.role }, "mySecretKey", {
    expiresIn: "10m",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, names: user.names }, "myRefreshSecretKey", {expiresIn: "15s"});
};

export const loginAction = (user,history) => async (dispatch) => {
 
  try {
    dispatch(loginRequest());
    const {username}=user
    const {password}=user 
    const basicAuth = Buffer.from(`${username}:${password}`).toString('base64');
   const Url=process.env.REACT_APP_BASE_URL+'/api/agent/user/rest/v.4.14.01/auth';
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
    if(res.data.responseCode===100 && res.data.data.group==="retail_agents" && res.data.data.agencyBankingStatus===true ){
      history.push('/dashboard',{push:true})
      const userId=res.data.data.id
      const name=res.data.data.names
      const role=res.data.data.brokering
      const group=res.data.data.group
     
      const claims={userId,name,role}
      const token= jwt.sign(claims,jwt_secret, { expiresIn: "7d"});
      const resData=res.data
       dispatch(loginSuccess({resData,password:password,basicAuth:basicAuth}));
     // dispatch(loginSuccess(res.data));
      sessionStorage.setItem('mobicash-auth',token)
      return  sessionStorage.setItem('mobicash-auth',token);
    }
    else if(res.data.responseCode===100 && res.data.data.group!=="retail_agents"){
      dispatch(loginFailure(" Authorized Agent are only allowed, Please contact MobiCash."));
    }
    else{
      dispatch(loginFailure(res.data.codeDescription));
    }
  } catch (err) {
    if (err.response) {
     const errorMessage = "Something went wrong,Please try again later.";
      dispatch(loginFailure(errorMessage));
   
    } else {
      dispatch(loginFailure("The service is currently not available"));
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