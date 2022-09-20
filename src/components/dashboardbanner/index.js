import React from "react"
import { Button, Typography, useMediaQuery,Box,Grid,Divider } from "@mui/material";
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
import Service from "../../pages/services/Service"
export default function Banner() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <React.Fragment>
 <BannerContainer >
      <Box sx={{ width: '100%', maxWidth: 560, bgcolor: 'transparent',marginTop:4 }}>
            <Box sx={{ my: 1, mx: 2 }}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom variant="h6" color="gray" component="div">
                    Dear Mahame Alfred,
                  </Typography>
                  <Typography gutterBottom variant="h6" color="gray" component="div">
                    Welcome back to MobiBanker!
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Divider variant="middle" />
            <Service/>
          </Box>
      <Widget/>
      <BannerContent>
      </BannerContent>
    </BannerContainer>
    </React.Fragment>
   
  );
}
