import React, {lazy } from 'react'
import {  Route, Switch } from "react-router-dom";
//import DashboardRoute from "./Dashboard.routes";
import LoginRoute from "./Login.routes";
import Logout from '../pages/logout/Logout';
import Forgotpassword from '../pages/forgotpassword/Forgotpassword';
import Resetpassword from '../pages/resetpassword/Resetpassword';
import FaqPage from '../pages/faqpage';

const DashboardRoute=lazy(()=>import("./Dashboard.routes"))

 const Index=()=>{
  return(
    <Switch>
  <Route exact path="/"   component={LoginRoute}/>
        <Route  path="/dashboard"   component={DashboardRoute }/>
        <Route  path="/display"  component={Logout}/>
        <Route  path="/forgot-pin"  component={Forgotpassword}/>
        <Route  path="/reset-pin"  component={Resetpassword}/>
        <Route  path="/faq"  component={FaqPage}/>
    </Switch>
  )

}
export default Index