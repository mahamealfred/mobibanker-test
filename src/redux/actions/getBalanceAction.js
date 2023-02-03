import axios from "axios";
import {
    GET_BALANCE_REQUEST,
    GET_BALANCE_SUCCESS,
    GET_BALANCE_FAILURE,
  } from "../types/getBalanceType";
import dotenv from "dotenv";
dotenv.config();
export const getBalanceAction = (user) => async (dispatch) => {
  try {
    dispatch(getBalanceRequest());
    const {username}=user
    const {password}=user 
   // console.log("oooo",username,password,user)
  //const encodedBase64Token = Buffer.from(`${username}:${password}`).toString('base64');
  //let basicAuth='Basic ' + btoa(username + ':' + password);
    const Url=process.env.REACT_APP_BASE_URL+'/api/agent/utilities/user/rest/v.4.14.01/account-balance';
   const res = await axios.get(Url,{
     withCredentials: true,
    headers:{
    "Accept":"application/json",
    "Content-Type": "application/json",
  //'Authorization': + basicAuth,
 },
  auth: {
    username,
    password
  }
   });
      //const token= jwt.sign(claims,jwt_secret, { expiresIn: "7d"});
      if(res.data.responseCode===100){
        dispatch(getBalanceSuccess(res.data));
      }
  } catch (err) {
    if (err.response) {
      const errorMessage = "Something went wrong, Please try again later";
      dispatch(getBalanceFailure(errorMessage));
    } else {
      dispatch(getBalanceFailure("The service is currently not available"));
    }
  }
};
export const getBalanceRequest = () => {
  return {
    type: GET_BALANCE_REQUEST,
  };
};

export const getBalanceSuccess = (details) => {
  return {
    type: GET_BALANCE_SUCCESS,
    payload: details,
  };
};
export const getBalanceFailure = (error) => {
  return {
    type: GET_BALANCE_FAILURE,
    payload: error,
  };
};