import React from "react";
import { useRouteMatch, Route,Switch } from "react-router-dom";
import Dashboard from "../views/Dashboard";
import PrivateRoute from "./PrivateRoutes"
import Home from "../pages/home/Home";
import HomePage from "../pages/home/HomePage";

function App() {
  const {path}=useRouteMatch();
  
 
    return (
    
      <Switch >
      <Dashboard>
          <Route
            component={({ match }) => (
              <>
                <PrivateRoute exact path={path} component={HomePage} />
              </>
            )}
          />
           {/* <Route
          component={({ match }) => (
            <>
              <PrivateRoute
                exact
                path={`${path}/service`}
                component={HomePage}
              />
            </>
          )}
        /> */}
        </Dashboard>
      </Switch>
       
     
    );
  }
  
  export default App;