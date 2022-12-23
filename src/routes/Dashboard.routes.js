import React ,{lazy} from "react";
import { useRouteMatch, Route,Switch } from "react-router-dom";
import Dashboard from "../views/Dashboard";
import PrivateRoute from "./PrivateRoutes"
import HomePage from "../pages/home/HomePage";
import Account from "../pages/myaccount/Account";
import  MyProfile from "../pages/myaccount/AccountProfile";
import  FaqPage from "../pages/faqpage";
import SubservicePage from "../pages/subservicespage";
import RRAService from "../pages/servicespages/rra/RraForm";
import CBHIService  from "../pages/servicespages/cbhi/CbhiIdentificationForm";
import LTSSService from "../pages/servicespages/ltss/LtssForm";
import EleCtricityForm from "../pages/servicespages/electricity/ElectricityForm";
import RnitForm from "../pages/servicespages/rnit/RnitForm";
import Createaccount from "../pages/subservicespage/gt/pages/Createaccount";
import Deposit from "../pages/subservicespage/gt/pages/Deposit";
import MoneyTransfer from "../pages/subservicespage/gt/pages/Transfer";
import Withdraw from "../pages/subservicespage/gt/pages/Withdraw";

import MobishuliService from "../pages/mobishuliservice/";
import SchoolFeesPayment from "../pages/mobishuliservice/pages/SchoolFeesPayment";
import MobiShuliDeposit from "../pages/mobishuliservice/pages/Deposit";
// const HomePage=lazy(()=>import("../pages/home/HomePage"));
// const Account=lazy(()=>import("../pages/myaccount/Account"));
// const MyProfile=lazy(()=>import("../pages/myaccount/AccountProfile"));
// const FaqPage=lazy(()=>import("../pages/faqpage"));

function App() {
  const {path}=useRouteMatch();
    return (
      <Switch >
      <Dashboard>
          <Route
            component={({ match }) => (
              <>
                {/* <PrivateRoute exact path={path} component={Home} /> */}
                <PrivateRoute exact path={path} component={HomePage} />
                <PrivateRoute exact path={`${path}/my-account`} component={Account} />
                <PrivateRoute exact path={`${path}/my-profile`} component={MyProfile} />
                <PrivateRoute exact path={`${path}/faq`} component={FaqPage} />
                <PrivateRoute exact path={`${path}/rra-service`} component={RRAService} />
                <PrivateRoute exact path={`${path}/cbhi-service`} component={CBHIService} />
                <PrivateRoute exact path={`${path}/ltss-service`} component={LTSSService} />
                <PrivateRoute exact path={`${path}/rnit-service`} component={RnitForm} />
                <PrivateRoute exact path={`${path}/electricity-service`} component={EleCtricityForm} />
                {/* GT bank */}
                <PrivateRoute exact path={`${path}/gt-bank-service`} component={SubservicePage} />
                <PrivateRoute exact path={`${path}/gt-bank-service/open-account`} component={Createaccount} />
                <PrivateRoute exact path={`${path}/gt-bank-service/deposit`} component={Deposit} />
                <PrivateRoute exact path={`${path}/gt-bank-service/transfer`} component={MoneyTransfer} />
                <PrivateRoute exact path={`${path}/gt-bank-service/withdraw`} component={Withdraw} />
                {/* MOBISHULI */}
                <PrivateRoute exact path={`${path}/mobishuli-service`} component={MobishuliService} />
                <PrivateRoute exact path={`${path}/mobishuli-service/payment`} component={SchoolFeesPayment} />
                <PrivateRoute exact path={`${path}/mobishuli-service/deposit`} component={MobiShuliDeposit} />
              </>
            )}
          />
         
      
        </Dashboard>
      </Switch>
       
     
    );
  }
  
  export default App;