import { combineReducers } from "redux";
   import getYearReducer from "./getYearReducer";
   import loginReducer from "./loginReducer";

   //CBHI
import getCbhiNidDetailsReducer from "./getCbhiNidDetailsReducer";
import cbhiPayamentReducer from "./cbhiPaymentReducer";
import changePasswordReducer from "./changePasswordReducer";
// import forgotPasswordReducer from "./forgotPasswordReducer";


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
    // forgotPassword:forgotPasswordReducer,

    //all 
     balance:balanceReducer,
     transactions:transactionsReducer,
     getYear:getYearReducer,

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