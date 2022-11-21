import React, { Component } from "react";


import Home from "../pages/home/Home";

export default class Dashboard extends Component {
  render() {
    // const props=this.props.children
    return (
      <div>
        <Home >
        {this.props.children}
        </Home>  
      
        {/* <Footer/> */}
      </div>
    );
  }
}