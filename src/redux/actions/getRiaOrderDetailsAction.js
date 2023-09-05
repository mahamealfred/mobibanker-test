import axios from "axios";
import {
  GET_RIA_ORDER_DETAILS_REQUEST,
  GET_RIA_ORDER_DETAILS_SUCCESS,
  GET_RIA_ORDER_DETAILS_FAILURE,
} from "../types/getRiaOrderDetailsType";
import dotenv from "dotenv";
dotenv.config()
export const getRiaOrderDetailsAction = (details) => async (dispatch) => {
  try {
    dispatch(getRiaOrderDetailsRequest());
    const  {orderNum}=details
    const  {orderPin}=details
 const Url=process.env.REACT_APP_BASE_URL+'/api/ria/service/rest/v.4.14.01/Read-RiaRemitance-Orders-Ready-File-To-Be-Paid';
   const res = await axios.get(Url,{
    params:{
      orderNo:orderNum,
      PIN:orderPin
    }
   }, {
   
    headers:{
    "Accept":"application/json",
    "Content-Type": "application/json",
  //'Authorization': + basicAuth,
 },
   });
      if(res.data.responseCode===100){
        dispatch(getRiaOrderDetailsSuccess(res.data));
      }  
      else if(res.data.responseCode===105){
        let errMsg=res.data.data.houseHoldNID[0]
        dispatch(getRiaOrderDetailsFailure(errMsg));
      }
      else{
        let errMsg=res.data.codeDescription
        dispatch(getRiaOrderDetailsFailure(errMsg));
      }
  } catch (err) {
    if (err.response) {
   let errorMessage = ''
       errorMessage="Something went wrong,Please try again later."
       // errorMessage=await err.response.data.message
        dispatch(getRiaOrderDetailsFailure(errorMessage));
      
    } else {
      dispatch(getRiaOrderDetailsFailure("The service is currently not available"));
    }
  }
};

export const getRiaOrderDetailsRequest = () => {
  return {
    type: GET_RIA_ORDER_DETAILS_REQUEST,
  };
};

export const getRiaOrderDetailsSuccess = (details) => {
  return {
    type: GET_RIA_ORDER_DETAILS_SUCCESS,
    payload: details,
  };
};
export const getRiaOrderDetailsFailure = (error) => {
  return {
    type: GET_RIA_ORDER_DETAILS_FAILURE,
    payload: error,
  };
};