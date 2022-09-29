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
import TopNav from "../topNav/TopNav";
import Headerbanner from "../headerbanner"
import BottomNav from "../bottomNav/BottomNav";
import MobicashSolution from "../mobicashsolutions"
import AuthApi from "../../context/api";

export default function Banner() {
  const theme = useTheme();
  const Auth=React.useContext(AuthApi)
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <React.Fragment>
        <TopNav/>
 <BannerContainer >
 {/* <BannerImage src="../../Assets/images/mobicashmarketing.png" /> */}
      <BannerLoginContainer >
         <Login   Auth={Auth}/>
      </BannerLoginContainer>
      <BannerContent>
        <Widget />
      </BannerContent>
    </BannerContainer>
    <BottomNav/>
    <MobicashSolution />
    <Headerbanner/>
    
    <Footer/>
    </React.Fragment>
   
  );
}
