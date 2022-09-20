import React from "react"
import { Button, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import {
  BannerContainer,
  BannerContent,
  BannerDescription,
  BannerImage,
  BannerLoginContainer,
  BannerShopButton,
  BannerTitle,
} from "../styles/banner";
import Appbar from "../appbar";
import Footer from "../footer/Footer";
import Login from "../../pages/login/Login"
import Widget from "../widget/Widget";
export default function Banner() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <React.Fragment>
        <Appbar/>
 <BannerContainer >
    
      <BannerLoginContainer >
         <Login/>
      </BannerLoginContainer>
      <BannerContent>
        <Widget/>
      </BannerContent>
    </BannerContainer>
    <Footer/>
    </React.Fragment>
   
  );
}
