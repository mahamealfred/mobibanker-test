import { AppBar, Toolbar,styled,Box,Button,Typography} from '@mui/material'
import React, { useEffect } from 'react'
import NativeSelect from '@mui/material/NativeSelect';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import LanguageIcon from '@mui/icons-material/Language';
import { Colors, DrawerWidth } from "../styles/theme";
import { useTranslation } from "react-i18next";
import CssBaseline from '@mui/material/CssBaseline';
import i18next from "i18next";
import {
  flexBetweenCenter,
  justifyCenter,
  fullWidthFlex,
} from '../styles/theme';
const TopNav = () => {
  const [ setLanguage] = React.useState('');
  const { i18n, t } = useTranslation(["common"]);

	useEffect(() => {
		if (localStorage.getItem("i18nextLng")?.length > 2) {
			i18next.changeLanguage("en");
		}
	}, []);

	const handleLanguageChange = (e) => {
		i18n.changeLanguage(e.target.value);
	};
    const StyledToolbar=styled(Toolbar)({
        display:"flex",
        justifyContent:"space-between",
        padding:5,
        margin:10  
    });
    const MobiLogoImg=styled(Box)(({theme})=>({
        marginLeft:35,
    }))
    const MobiBankerImg=styled(Box)(({theme})=>({
        marginRight:35,

    }))
    const AppbarHeader = styled(Typography)(() => ({
      padding: "4px",
      flexGrow: 1,
      fontSize: "4em",
      fontFamily: '"Montez", "cursive"',
      color: Colors.secondary,
      "&:hover": {
        animation: ` 0.5s cubic-bezier(0.455, 0.030, 0.515, 0.955) both`,
      },
    }));
  return (
    <AppBar position="sticky"  elevation={1} sx={{backgroundColor:'white',width:"100%"}} >
      
        {/* <CssBaseline/> */}
        <StyledToolbar>
            <MobiLogoImg>
            <Box
        component="img"
        sx={{
          // height: 80,
          // width: 250,
          marginLeft:8,
          // maxHeight: { xs: 60, md: 300 },
          // maxWidth: { xs: 150, md: 300 },
          maxHeight: { xs: 300, md: 300},
          maxWidth: { xs: 300, md: 300},
          display:{xs:"none",sm:"block"}
        }}
        alt="mobicash logo"
        src="../../images/mobibk.png"
      />
       <Box
              component="img"
              sx={{
               
                maxHeight: { xs: 300, md: 300},
                maxWidth: { xs: 300, md: 300},
                display: { xs: "block", sm: "none", md: "none" }
              }}
              alt="mobicash logo"
              src="../../images/mobibk.png"
            />
        
            </MobiLogoImg>
            {/* <Box
        component="img"
        sx={{
          height: 100,
          width: 300,
          maxHeight: { xs: 60, md: 300},
          maxWidth: { xs: 150, md: 300},
          display:{xs:"none",sm:"none",md:"block"}
        }}
        alt="mobicash logo"
        src="../../images/mobibk.png"
      /> */}
    
        < MobiBankerImg>
        <Box sx={{ minWidth: 100 }}>
     
      <Box
      sx={{
        ...fullWidthFlex,
       
        display:{xs:"none",sm:"block"}
      }}
    >
        <Stack>
            <Paper elevation={0} sx={justifyCenter}>
              <Button sx={{ minWidth: 100 }}>
                <Box sx={{ ...justifyCenter, mr: 1 }}>
                  <LanguageIcon size={20} sx={{color:"#F9842C"}} />
                </Box>
                <FormControl>
                  <NativeSelect
                  defaultValue="en"
                  value={localStorage.getItem("i18nextLng")}
                  onChange={handleLanguageChange}
                  >
                    
              {/* <option value="ki">Kinyarwanda</option> */}
              <option value="en">English</option>
              {/* <option value="fr">Français</option> */}
                  </NativeSelect>
                </FormControl>
              </Button>
            </Paper>
          </Stack>
      </Box>
    
        </Box>
        </MobiBankerImg>
       
        </StyledToolbar>

       
    </AppBar>
  )
}

export default TopNav