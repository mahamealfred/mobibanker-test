import React,{Component} from "react";
import { Suspense } from "react";
import Routes from './routes/index';
import { BrowserRouter as Router} from "react-router-dom";
import "./App.css";
import AuthApi from "./context/api";
import { Box } from "@mui/system";
import  AuthContext from "./context";
import { useContext } from "react";
import { useEffect,useState } from "react";
import ThemeProvider from "./theme";


import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import PuffLoader from "react-spinners/PuffLoader";

if (process.env.REACT_APP_NODE_ENV === 'production') {
  disableReactDevTools();
}

function App(){


  return(
    <ThemeProvider>
    <Suspense fallback={
      <Box
display='flex'
justifyContent='center'
alignContent="center"
justifyItems="center"
m="auto"
>
<PuffLoader color="orange" size={80}  />
</Box>}>
       <Router>
        <Routes/>
      </Router>
      </Suspense>
      </ThemeProvider>
      
  )
}
export default App
