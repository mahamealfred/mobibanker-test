import { AppBar, Toolbar,styled,Box,Button,Typography} from '@mui/material'
import React from 'react'
import NativeSelect from '@mui/material/NativeSelect';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import LanguageIcon from '@mui/icons-material/Language';
import { Colors, DrawerWidth } from "../styles/theme";

import {
  flexBetweenCenter,
  justifyCenter,
  fullWidthFlex,
} from '../styles/theme';
const TopNav = () => {
  const [ setLanguage] = React.useState('');
  const handleChange = (event) => {
    setLanguage(event.target.value);
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
    <AppBar position="sticky"  elevation={0} sx={{backgroundColor:'white'}} >
        <StyledToolbar>
            <MobiLogoImg>
            <Box
        component="img"
        sx={{
          height: 80,
          width: 250,
          marginLeft:8,
          maxHeight: { xs: 60, md: 300 },
          maxWidth: { xs: 150, md: 300 },
          display:{xs:"none",sm:"block"}
        }}
        alt="mobicash logo"
        src="../../Assets/images/logo.png"
      />
      
            <Box
          sx={{display:{xs:"block",sm:"none"}}}
        >
        <img src="../../Assets/images/img_144.png" alt="logo" height="40" width="50" margin="50px"/>
        </Box>
            </MobiLogoImg>
            <Box
        component="img"
        sx={{
          height: 100,
          width: 300,
          maxHeight: { xs: 60, md: 300},
          maxWidth: { xs: 150, md: 300},
          display:{xs:"none",sm:"block"}
        }}
        alt="mobicash logo"
        src="../../Assets/images/mobibk.png"
      />
    
        < MobiBankerImg>
        <Box sx={{ minWidth: 100 }}>
      {/* <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
        </InputLabel>
        <NativeSelect
          defaultValue={10}
          inputProps={{
            name: 'age',
            id: 'uncontrolled-native',
          }}
        >
          <option value={10}>Kinyarwanda</option>
          <option value={20}>English</option>
          <option value={30}>Francais</option>
        </NativeSelect>
      </FormControl> */}
      <Box
      sx={{
        ...fullWidthFlex,
        borderTop: '1px solid #ddd',
      }}
    >
        <Stack>
            <Paper sx={justifyCenter}>
              <Button sx={{ minWidth: 100 }}>
                <Box sx={{ ...justifyCenter, mr: 1 }}>
                  <LanguageIcon size={20} sx={{color:"#F9842C"}} />
                </Box>
                <FormControl>
                  <NativeSelect
                  defaultValue={10}
                  >
              <option value={10}>Kinyarwanda</option>
              <option value={20}>English</option>
              <option value={30}>Francais</option>
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