import React from "react";
import { useRouteMatch, Route,Switch } from "react-router-dom";
import Dashboard from "../views/Dashboard";
import PrivateRoute from "./PrivateRoutes"
import Home from "../pages/home/Home";

function App() {
  const {path}=useRouteMatch();
    return (
    
      <Switch >
      <Dashboard>
          <Route
            component={({ match }) => (
              <>
                <PrivateRoute exact path={path} component={Home} />
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