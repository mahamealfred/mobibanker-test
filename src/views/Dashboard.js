import React, { Component } from "react";
import TopNav from "../components/topNav/TopNav";
export default class Dashboard extends Component {
  render() {
    return (
      <div>
      
          {this.props.children}
      </div>
    );
  }
}