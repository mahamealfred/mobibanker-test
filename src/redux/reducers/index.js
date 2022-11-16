import { combineReducers } from "redux";
   import getYearReducer from "./getYearReducer";
   import loginReducer from "./loginReducer";
   import forgotPasswordReducer from "./forgotPasswordReducer";
   import resetPasswordReducer from "./resetPasswordReducer";

   //CBHI
import getCbhiNidDetailsReducer from "./getCbhiNidDetailsReducer";
import cbhiPayamentReducer from "./cbhiPaymentReducer";
import changePasswordReducer from "./changePasswordReducer";


             //ELECTRICITY
import electricityReducer from "./electricityReducer";
import electricityPaymentReducer from "./electricityPaymentReducer";

import transactionsReducer from "./transactionsReducer";
import balanceReducer from "./getBalanceReducer";
             //rra
 import getDocDetailsReducer from "./getDocDetailsReducer";
 import rraPaymentReducer from "./rraPaymentReducer";
    //LTSS
     import getLtssIdentificationDetailsReducer from "./getLtssIdentificationReducer";
     import ltssPaymentReducer from "./ltssPaymentReducer";
// import getClientDetailsReducer from "./getClientDetailsReducer";
              //rnit
import getRnitDetailsReducer from "./getRnitIdentificationDetailsReducer";
 import rnitPaymentReducer from "./rnitPaymentReducer";
// import chashinReducer from "./cashInReducer";
// import getClientNidDetailsReducer from "./getClientNidDetailsReducer";
//import clientEnrollmentReducer from "./clientEnrollmentReducer";
const allReducers = combineReducers({
     login:loginReducer,
     changePassword: changePasswordReducer,
     forgotPassword:forgotPasswordReducer,
     resetPassword:resetPasswordReducer,

    //all 
     balance:balanceReducer,
     transactions:transactionsReducer,
     getYear:getYearReducer,
     //electricity
     getElectricityDetails:electricityReducer,
     electricityPayment:electricityPaymentReducer,

     //cbhi
     getCbhiNidDetails:getCbhiNidDetailsReducer ,
     cbhiPayment:cbhiPayamentReducer,

     //rra
     getDocDetails: getDocDetailsReducer,
     rraPayment: rraPaymentReducer,

    //rnit
    getRnitDetails: getRnitDetailsReducer,
    rnitPayment:rnitPaymentReducer,

    //ltss
     getLtssIndDetails: getLtssIdentificationDetailsReducer,
     ltssPayment:ltssPaymentReducer,
    //client
    // getClientDetails:getClientDetailsReducer,
    // cashIn:chashinReducer,
    // getClientNidDetails:getClientNidDetailsReducer,
    // clientEnrollment: clientEnrollmentReducer,
});

export default allReducers;