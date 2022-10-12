import React, { Component } from "react";
import BottomNav from "../components/bottomNav/BottomNav";
import Slider from "../components/slider/Slider";
import Home from "../pages/home/Home";
import HeaderBanner from "../components/headerbanner";
import Footer from "../components/footer/Footer";
export default class Dashboard extends Component {
  render() {
    const props=this.props.children
    return (
      <div>
        <Home >
        {this.props.children}
        </Home>  
        <Slider/>
        <Footer/>
      </div>
    );
  }
}