import axios from "axios";
import {
  TOPUPMOBILEMONEY_REQUEST,
  TOPUPMOBILEMONEY_SUCCESS,
  TOPUPMOBILEMONEY_FAILURE,
} from "../types/topUpMobileMoneyType";

import dotenv from "dotenv"
dotenv.config()
export const topUpMobileMoneyAction = (details) => async (dispatch) => {
  try {
    dispatch(topUpMobileMoneyRequest());
    const {amount}=details
    const {phone}=details
    const Url='http://apiagent.mobicash.rw/api/access-momo/rest/v.4.14.01/deposit'
    var data = JSON.stringify({
      "amount": amount,
      "phone": phone
    });
    var config = {
      method: 'post',
      url:Url,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    const res = await axios(config)

  // let status
//    response?.map((p)=>{
// if(p.retcode===500){
//   status = p.retcode
// }
//    })


    if (res.data[0].retcode=== 500) {
      await dispatch(topUpMobileMoneyFailure(res.data[0].remarks));
    }
    else{
      await dispatch(topUpMobileMoneySuccess(res.data));
       }

  } catch (err) {
    if (err.response) {
       let errorMessage = 'Something went wrong, Please try again.'
        dispatch(topUpMobileMoneyFailure(errorMessage)); 
    } else {
      dispatch(topUpMobileMoneyFailure("The service is currently not available"));
    }
  }
};

export const topUpMobileMoneyRequest = () => {
  return {
    type: TOPUPMOBILEMONEY_REQUEST,
  };
};

export const topUpMobileMoneySuccess = (details) => {
  return {
    type: TOPUPMOBILEMONEY_SUCCESS,
    payload: details,
  };
};
export const topUpMobileMoneyFailure = (error) => {
  return {
    type: TOPUPMOBILEMONEY_FAILURE,
    payload: error,
  };
};