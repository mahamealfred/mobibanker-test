import axios from "axios";
import {
    OPEN_ACCOUNT_REQUEST,
    OPEN_ACCOUNT_SUCCESS,
    OPEN_ACCOUNT_FAILURE,
  } from "../types/openAccountType";
  
  import dotenv from "dotenv"
  dotenv.config()

export const openAccountAction = (details,username,password) => async (dispatch) => {
  try {
    dispatch(openAccountRequest());
   const {documentNumber}=details
  const {nationality}=details
  const {fatherNames}=details
 const  {motherNames}=details
 const  {telephone}=details
 const {firstName}=details
 const {lastName}=details
 const {father}=details
 const {mother}=details
 const {idNumber}=details
 const {phoneNumber}=details
 const {email}=details
 const {dateOfBirth}=details
 const {dob}=details
 const {accountType}=details
 const {branchName}=details
 const {civilStatus}=details
 const {gender}=details
 const {spouse}=details
 const {placeOfBirth}=details
 const {countryOfBirth}=details
 const {placeOfIssue}=details
 const {dateOfIssue}=details
 const {province}=details
 const {district}=details
 const {sector}=details
 const {cell}=details
  const {village}=details
  const {photo}=details
  const {initialamount}=details
  const {branchCode}=details

    //const {accountName}=details
    // const {brokering}=details
    // const {userGroup}=details
    //let basicAuth='Basic ' + btoa(username + ':' + password);
    const Url=process.env.REACT_APP_BASE+'/api/agent/user/rest/v.4.14.01/gt-bank-account-opening';

    const res = await axios.post(Url,{
        documentNumber: documentNumber,
        branchCode:branchCode.toString(),
        initialeAmount:initialamount,
        nationality: nationality,
        fatherNames: fatherNames,
        motherNames: motherNames,
        telephone: telephone,
        foreName: firstName,
        surnames: lastName,
        // father: father,
        // mother: mother,
        idNumber: idNumber,
        phoneNumber: phoneNumber,
        email: email,
        dateOfBirth: dateOfBirth,
        // dob: dob,
        accountType: "CURRENT",
        branchName: "KIGALI",
        sex: gender,
        civilStatus: civilStatus,
        spouse: spouse,
        placeOfBirth: placeOfBirth,
        countryOfBirth: countryOfBirth,
        placeOfIssue: placeOfIssue,
        dateOfIssue: dateOfIssue,
        province: province,
        district: district,
        sector: sector,
        cell: cell,
        village: village,
        photo: photo
      //  userGroup:userGroup,
      //  brokering:brokering
        
   },{
    withCredentials: true,
    headers:{
    "Accept":"application/json",
    "Content-Type": "application/json",
   // 'Authorization': + basicAuth,
 },
 auth: {
  username,
  password
}

   });

      if(res.data.responseCode===100){
       await dispatch(openAccountSuccess(res.data));
      }
      else if(res.data.responseCode!==100){
     
        await dispatch(openAccountFailure(res.data.codeDescription)); 
      }
      else{
        await dispatch(openAccountFailure("Failed, Please try again later."));
       }
   
  } catch (err) {
    if (err.response) {
       let errorMessage = 'Something went wrong, Please try again.'
        dispatch(openAccountFailure(errorMessage)); 
    } else {
      dispatch(openAccountFailure("The service is currently not available"));
    }
  }
};

export const openAccountRequest = () => {
  return {
    type: OPEN_ACCOUNT_REQUEST,
  };
};

export const openAccountSuccess = (details) => {
  return {
    type: OPEN_ACCOUNT_SUCCESS,
    payload: details,
  };
};
export const openAccountFailure = (error) => {
  return {
    type: OPEN_ACCOUNT_FAILURE,
    payload: error,
  };
};