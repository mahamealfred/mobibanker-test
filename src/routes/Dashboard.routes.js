import React ,{lazy} from "react";
import { useRouteMatch, Route,Switch } from "react-router-dom";
import Dashboard from "../views/Dashboard";
import PrivateRoute from "./PrivateRoutes"
import HomePage from "../pages/home/HomePage";
import Account from "../pages/myaccount/Account";
import  MyProfile from "../pages/myaccount/AccountProfile";
import  FaqPage from "../pages/faqpage";
import SubservicePage from "../pages/subservicespage";
import RRAService from "../pages/servicespages/rra/RraForm"
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
                <PrivateRoute exact path={`${path}/gt-bank-service`} component={SubservicePage} />
                <PrivateRoute exact path={`${path}/rra-service`} component={RRAService} />
              </>
            )}
          />
         
      
        </Dashboard>
      </Switch>
       
     
    );
  }
  
  export default App;