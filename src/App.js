import React,{Component} from "react";
import { Suspense } from "react";
import Routes from './routes/index';
import { BrowserRouter as Router} from "react-router-dom";
import "./App.css";


export default class App extends Component {


  render() {
    return (
      <Suspense fallback={null}>
       <Router>
        <Routes/>
      </Router>
      </Suspense>
     
    )
  }
};
