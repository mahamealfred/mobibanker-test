import React from 'react'
import {  Route, Switch } from "react-router-dom";
import DashboardRoute from "./Dashboard.routes";
import LoginRoute from "./Login.routes";
import Logout from '../pages/logout/Logout';
import Forgotpassword from '../pages/forgotpassword/Forgotpassword';
import Resetpassword from '../pages/resetpassword/Resetpassword';
import FaqPage from '../pages/faqpage'
// import DepositReceipt from '../pages/subservicespage/gt/receipt/DepositReceipt';
// const token =sessionStorage.getItem('mobicash-auth');
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
  // const Auth=sessionStorage.getItem("mobicash-auth")
  return(
    <Switch>
        <Route exact path="/"   component={LoginRoute}/>
        <Route  path="/dashboard"  component={DashboardRoute}/>
        <Route  path="/display"  component={Logout}/>
        <Route  path="/forgot-pin"  component={Forgotpassword}/>
        <Route  path="/reset-pin"  component={Resetpassword}/>
        <Route  path="/faq"  component={FaqPage}/>
        {/* <Route  path="/receipt"  component={DepositReceipt}/> */}
    </Switch>
  )

}
export default Index