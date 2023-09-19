import axios from "axios";
import {
    REGISTER_CLIENT_REQUEST,
    REGISTER_CLIENT_SUCCESS,
    REGISTER_CLIENT_FAILURE,
  } from "../types/registerClientType";
  
  import dotenv from "dotenv"
  dotenv.config()

export const registerClientAction = (details,username,password) => async (dispatch) => {

  try {
    dispatch(registerClientRequest());
 const {clientUsername}=details
 const {nationality}=details
 const {identityType}=details
 const {firstName}=details
 const {lastName}=details
 const {idNumber}=details
 const {phoneNumber}=details
 const {email}=details
 const {dateOfBirth}=details
 const {civilStatus}=details
 const {gender}=details
 const {province}=details
 const {district}=details
 const {sector}=details
 const {cell}=details
  

    //const {accountName}=details
    // const {brokering}=details
    // const {userGroup}=details
    //let basicAuth='Basic ' + btoa(username + ':' + password);
    const Url='https://agentapi.mobicash.rw/api/ria/service/rest/v.4.14.01/individual-clients-enrollment-by-agent';

    const res = await axios.post(Url,{
      
        // names:"RIA Tester 100",
        // username:"riatester100",
        // email:"mahamealfred11@gmail.com",
        // nationality:"rwanda",
        // identity_type:"national_id",
        // identity_number:"1199111989210900",
        // maritial_status:"married",
        // gender:"male",
        // date_of_birth:"1991-05-26",
        // phoneNumber:"0784012119",
        // province:"Kigali city",
        // district:"Gasabo",
        // sector:"Remera",
        // city:"Kigali"
        
            names: firstName,
            username:clientUsername,
            email:email,
            nationality:nationality,
            identity_type:identityType,
            identity_number:idNumber,
            maritial_status:civilStatus,
            gender:gender,
            date_of_birth:"1991-05-26",
            phoneNumber:phoneNumber,
            province:province,
            district:district,
            sector:sector,
            city:cell
            
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
       await dispatch(registerClientSuccess(res.data));
      }
      else if(res.data.responseCode!==100){
     
        await dispatch(registerClientFailure(res.data.codeDescription)); 
      }
      else{
        await dispatch(registerClientFailure("Failed, Please try again later."));
       }
   
  } catch (err) {
    if (err.response) {

       let errorMessage = err.response.data.message
        dispatch(registerClientFailure(errorMessage)); 
    } else {
      dispatch(registerClientFailure("The service is currently not available"));
    }
  }
};

export const registerClientRequest = () => {
  return {
    type: REGISTER_CLIENT_REQUEST,
  };
};

export const registerClientSuccess = (details) => {
  return {
    type: REGISTER_CLIENT_SUCCESS,
    payload: details,
  };
};
export const registerClientFailure = (error) => {
  return {
    type: REGISTER_CLIENT_FAILURE,
    payload: error,
  };
};