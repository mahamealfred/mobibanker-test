import React from "react";
import { useRouteMatch, Route,Switch } from "react-router-dom";
import Login from "../views/Login";
import LoginPrivateRoute from "./LoginPrivateRoutes"
import Banner from "../components/banner";
function App() {
  const {path}=useRouteMatch();
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