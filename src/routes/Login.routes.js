import React from "react";
import { useRouteMatch, Route,Switch } from "react-router-dom";
import Login from "../views/Login";
import LoginPrivateRoute from "./LoginPrivateRoutes"
import Home from "../pages/home/Home";
import {useEffect} from "react";
import jwt from "jsonwebtoken";
import { useHistory } from 'react-router-dom';
import Banner from "../components/banner";
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
      <Login>
          <Route
            component={({ match }) => (
              <>
                <LoginPrivateRoute exact path={path} component={Banner} />
              </>
            )}
          />
        </Login>
      </Switch>
       
     
    );
  }
  
  export default App;