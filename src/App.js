import React,{Component} from "react";
import { Suspense } from "react";
import Routes from './routes/index';
import { BrowserRouter as Router} from "react-router-dom";
import "./App.css";
import AuthApi from "./context/api";
import { Box } from "@mui/system";
import FooterMenu from "./components/footerMenu";

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
  const [auth,setAuth]=React.useState(false)
  return(
    <AuthApi.Provider value={{auth,setAuth}}>
    <Suspense fallback={null}>
       <Router>
        <Routes/>
      </Router>
      <Box sx={{
         display: { xs: 'flex',sm:"none", md: 'none' }, 
         width: '100%',
         background: "white",
         alignItems: 'center',
         zIndex: 99,  
         borderTop: `2px solid #F9842C`,
         position:"fixed",
         bottom: 0,
         left: 0,
          }}>
          <FooterMenu/>
          </Box>
      </Suspense>
    </AuthApi.Provider>
    
  )
}
export default App
