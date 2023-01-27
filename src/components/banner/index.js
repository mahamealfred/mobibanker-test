import React ,{useEffect,lazy} from "react"

import Login from "../../pages/login/Login"
import Widget from "../widget/Widget";
import {Box} from "@mui/material";


import {
  CardContent,
  Grid,
  Container,

} from '@mui/material';

import { useTranslation } from "react-i18next";
import i18next from "i18next";
import Footerr from "../footerr/"
const TopNav =lazy(()=>import("../topNav/TopNav"));
const Appbar =lazy(()=>import("../topNav/Appbar"));
export default function Banner() {
  const { i18n, t } = useTranslation(["common"]);

	useEffect(() => {
		if (localStorage.getItem("i18nextLng")?.length > 2) {
			i18next.changeLanguage("ki");
		}
	}, []);

	const handleLanguageChange = (e) => {
		i18n.changeLanguage(e.target.value);
	};
  return (
    <React.Fragment>
        <TopNav/>
        <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 2,
        width: "100%",
        height:{xs:"auto",sm:"auto",md:"100vh"}
      }}
    >
      
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
        >
          
          <Grid
            item
            lg={6}
            md={6}
            xs={12}
          >
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
         justifyCenter:"center",
        
        }}
      >
       
        <Login/>
      </Box>
    </CardContent>
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            xs={12}
          >
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyCenter:"center",
        }}
      >
      <Widget/>
      </Box>
    </CardContent>
            </Grid>
        </Grid>
      </Container>
    </Box>
    <Box
    sx={{

      display: {xs:"none",md:"block"}
     
    }}
    >
    </Box>
    <Footerr/>
    </React.Fragment>
  );
}
