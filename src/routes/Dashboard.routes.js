import React from "react";
import { useRouteMatch, Route,Switch } from "react-router-dom";
import Dashboard from "../views/Dashboard";
import PrivateRoute from "./PrivateRoutes"
import Home from "../pages/home/Home";
import {useEffect} from "react";
import jwt from "jsonwebtoken";
import { useHistory } from 'react-router-dom';
import Service from "../pages/services/Service"
import HomeDetails from "../pages/home/HomeDetails";
import Account from "../pages/myaccount/Account"
import MyProfile from "../pages/myaccount/AccountProfile";
import CbhiIdentificationForm from "../pages/servicespages/cbhi/CbhiIdentificationForm";
import ElectricityForm from "../pages/servicespages/electricity/ElectricityForm"
import { ComponentToPrint } from "../pages/servicespages/rra/ComponentToPrint";
function App() {
  const {path}=useRouteMatch();
  // const decode=(token) => {
  //   const JWT_SECRET="tokensecret";
  //   const payload = jwt.verify(token, JWT_SECRET);
  //    return payload;
  // }
  // const handleCloseWindows=()=>{
  // localStorage.removeItem('mobicashAuth');
  // }
  // const history= useHistory();
  // useEffect(() => {
  // //  window.addEventListener('beforeunload', handleCloseWindows);
  //   const token =sessionStorage.getItem('mobicash-auth');
  //   if (token) {
  //   const {exp}=decode(token);
  //   if(Date.now()>=exp*1000){
  //     localStorage.removeItem("mobicashAuth")
  //     sessionStorage.removeItem("mobicash-auth")
  //    return history.push('/', { push: true })
  //   }
  //   else{
  //     return null
  //   }
  // }
  // return history.push('/', { push: true })
  // }, [history]);
    return (
    
      <Switch >
      <Dashboard>
          <Route
            component={({ match }) => (
              <>
                {/* <PrivateRoute exact path={path} component={Home} /> */}
                <PrivateRoute exact path={path} component={HomeDetails} />
                <PrivateRoute exact path={`${path}/my-account`} component={Account} />
                <PrivateRoute exact path={`${path}/my-profile`} component={MyProfile} />
                <PrivateRoute exact path={`${path}/cbhi`} component={ComponentToPrint} />
              </>
            )}
          />
         
      
        </Dashboard>
      </Switch>
       
     
    );
  }
  
  export default App;