import axios from "axios";
import {
    GET_BRANCHES_REQUEST,
    GET_BRANCHES_SUCCESS,
    GET_BRANCHES_FAILURE,
  } from "../types/getBranchesType";
  import dotenv from "dotenv"
  dotenv.config()
export const getBranchesAction = () => async (dispatch) => {
  try {
    dispatch(getBranchesRequest());
    const Url =process.env.REACT_APP_BASE+'/api/agent/utilities/user/rest/v.4.14.01/gt-bank-banch'
   const res = await axios.get(Url);
 if(res.data.responseCode===100){
  dispatch(getBranchesSuccess(res.data.data));
 }
  } catch (err) {
    if (err.response) {
      const errorMessage = "Something went worng, Please try again later"
      dispatch(getBranchesFailure(errorMessage));
    } else {
      dispatch(getBranchesFailure("The service is currently not available"));
    }
  }
};

export const getBranchesRequest = () => {
  return {
    type:  GET_BRANCHES_REQUEST,
  };
};

export const getBranchesSuccess = (details) => {
  return {
    type:  GET_BRANCHES_SUCCESS,
    payload: details,
  };
};
export const getBranchesFailure = (error) => {
  return {
    type:  GET_BRANCHES_FAILURE,
    payload: error,
  };
};