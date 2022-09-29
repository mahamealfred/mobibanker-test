import React, { Component,useContext } from 'react'
import {  Route, Switch } from "react-router-dom";
import Banner from '../components/banner';
import AuthApi from '../context/api';
import SignIn from '../pages/signin/SignIn';
import DashboardRoute from "./Dashboard.routes";
import LoginRoute from "./Login.routes";


const token =sessionStorage.getItem('mobicash-auth');
// export default class index extends Component {

// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       isAuth:localStorage.getItem("mobicasAuth")
// //     };
// //   }
//     render() {
//         return (
//           <Switch>
//            <Route exact path="/" component={Banner}/>
//                 <Route path="/dashboard">
//                 <DashboardRoute />
//                  </Route>
           
//           </Switch>
//         )
//     }
// }

 const Index=()=>{
  //const Auth=useContext(AuthApi) 
  const Auth=sessionStorage.getItem("mobicash-auth")
  return(
    <Switch>
        <Route exact path="/"   component={LoginRoute}/>
        <Route  path="/dashboard"  component={DashboardRoute}/>
    
    </Switch>
  )

}
export default Index