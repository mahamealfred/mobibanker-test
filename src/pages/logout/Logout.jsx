import React, { useEffect } from 'react'
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useTranslation } from "react-i18next";
import {
    BannerContainer,
    BannerContent,
    BannerDescription,
    BannerImage,
    BannerLoginContainer,
    BannerShopButton,
    BannerTitle,
  } from "../../components/styles/banner";
  import { useHistory } from 'react-router-dom';
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const theme = createTheme();

const Logout = () => {
  const { i18n,t } = useTranslation(["home","common","login"]);
  const history=useHistory();
  const handleExist=()=>{
   return history.push('/',{push:true})
      }
    useEffect(()=>{

    },[])
  return (
  //   <BannerContainer >
  //   <BannerContent>
  //     <BannerTitle variant="h6" >
  //     <Typography variant="h6"> </Typography>
  //     </BannerTitle>
  //     <BannerDescription variant="subtitle">
  //    Thank you for using MobiCash
  //     </BannerDescription>
  //     <BannerShopButton color="primary">heloo</BannerShopButton>
  //   </BannerContent>
  // </BannerContainer>
  <ThemeProvider theme={theme}>
  <CssBaseline />
  <AppBar position="relative"  elevation={1} sx={{backgroundColor:'white'}} >
    <Toolbar>
      {/* <CameraIcon sx={{ mr: 2 }} /> */}
      {/* <Box
          sx={{ mr: 2 }} 
        >
        <img src="../../Assets/images/img_144.png" alt="logo" height="40" width="50" margin="50px"/>
        </Box> */}
      <Typography variant="h6" color="gray" noWrap>
   {/* MobiCash  */}
      </Typography>
    </Toolbar>
  </AppBar>
  <main>
    {/* Hero unit */}
    <Box
      sx={{
        bgcolor: 'background.paper',
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
        >
        MobiCash 
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
         {t("common:logoutmessage")}
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
         
          <Button variant="text"  onClick={handleExist}>{t("common:clickgotohome")}</Button>
        </Stack>
      </Container>
    </Box>
   
  </main>
  {/* Footer */}
  {/* <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
    <Typography variant="h6" align="center" gutterBottom>
      Footer
    </Typography>
    <Typography
      variant="subtitle1"
      align="center"
      color="text.secondary"
      component="p"
    >
      Something here to give the footer a purpose!
    </Typography>
    
  </Box> */}
  {/* End footer */}
</ThemeProvider>
  )
}

export default Logout