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
} from "../styles/headerbanner";

export default function Banner() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const styles = {
    paperContainer: {
        height: 500,
        width: "100%",
        backgroundImage: `url(${"../../Assets/images/mobicashmarketing.png"})`
    }
};
  return (
    <React.Fragment>
    <div style={styles.paperContainer}>
            </div>
    </React.Fragment>
   
  );
}
