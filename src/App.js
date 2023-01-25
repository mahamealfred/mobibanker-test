import React,{Component} from "react";
import { Suspense } from "react";
import Routes from './routes/index';
import { BrowserRouter as Router} from "react-router-dom";
import "./App.css";
import AuthApi from "./context/api";
import { Box } from "@mui/system";
import  AuthContext from "./context";
import { useContext } from "react";
import { useEffect } from "react";
import ThemeProvider from "./theme";
// export default class App extends Component {
//   render() {
//     return (
//       <Suspense fallback={null}>
//        <Router>
//         <Routes/>
//       </Router>
//       </Suspense>
     
//     )
//   }
// };
function App(){
  const {auth,setAuth}=useContext(AuthContext);

  return(
    <ThemeProvider>
    <Suspense fallback={null}>
    
       <Router>
        <Routes/>
      </Router>
     
      </Suspense>
      </ThemeProvider>
      
  )
}
export default App
