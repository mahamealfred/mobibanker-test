import React, { useEffect } from 'react'
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useTranslation } from "react-i18next";

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
  <ThemeProvider theme={theme}>
  {/* <CssBaseline /> */}
  <AppBar position="relative"  elevation={1} sx={{backgroundColor:'white'}} >
    <Toolbar>
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
</ThemeProvider>
  )
}

export default Logout