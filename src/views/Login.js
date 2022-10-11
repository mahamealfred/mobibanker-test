import { Box } from "@mui/material";
import React, { Component } from "react";
import FooterMenu from "../components/footerMenu";
export default class Login extends Component {
  render() {
    return (
      <div>
          {this.props.children}
      </div>
    );
  }
}