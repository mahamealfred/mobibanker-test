import React, { Component } from 'react'
import {  Route, Switch } from "react-router-dom";
import Banner from '../components/banner';
import SignIn from '../pages/signin/SignIn';
import DashboardRoute from "./Dashboard.routes";


export default class index extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       isAuth:localStorage.getItem("mobicasAuth")
//     };
//   }
    render() {
        return (
          <Switch>
          <Route exact path="/" component={Banner}/>
             <Route path="/dashboard">
             <DashboardRoute />
              </Route>
          </Switch>
          
       
          
        )
    }
}