import React ,{useEffect} from "react"
import { useTheme } from "@mui/system";
import Footer from "../footer/Footer";
import Login from "../../pages/login/Login"
import Widget from "../widget/Widget";
import TopNav from "../topNav/TopNav";

import {Box} from "@mui/material";
import Stack from '@mui/material/Stack';
import {
  justifyCenter,
 
} from '../styles/theme';
import {
  CardContent,
  Grid,
  Container,

} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import NativeSelect from '@mui/material/NativeSelect';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import { useTranslation } from "react-i18next";
import i18next from "i18next";
export default function Banner() {
  const { i18n, t } = useTranslation(["common"]);

	useEffect(() => {
		if (localStorage.getItem("i18nextLng")?.length > 2) {
			i18next.changeLanguage("en");
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
        height:"100vh"
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
       <Box sx={{
         display: { xs: 'flex',sm:"none", md: 'none' }, 
      
          }}>
         <Stack>
            <Paper sx={justifyCenter}>
                <Box sx={{ ...justifyCenter, mr: 1 }}>
                  <LanguageIcon size={20} sx={{color:"#F9842C"}} />
                </Box>
                <FormControl>
                  <NativeSelect
                  defaultValue="en"
                  value={localStorage.getItem("i18nextLng")}
                  onChange={handleLanguageChange}
                  >
              <option value="ki">Kinyarwanda</option>
              <option value="en">English</option>
              <option value="fr">Français</option>
                  </NativeSelect>
                </FormControl>
            </Paper>
          </Stack>
          </Box>
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
    <Footer/>
    </React.Fragment>
  );
}
