import { AppBar, Toolbar,styled,Box, Typography,Avatar} from '@mui/material'
import React from 'react'

const TopNav = () => {
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
  return (
    <AppBar position="sticky"  elevation={1} sx={{backgroundColor:'white'}} >
        <StyledToolbar>
            <MobiLogoImg>
            <Box
          sx={{display:{xs:"block",sm:"none"}}}
        >
        <img src="../../Assets/images/img_144.png" alt="logo" height="40" width="50" margin="50px"/>
        </Box>
        <Box
           sx={{display:{xs:"none",sm:"block"}}}
        >
        <img src="../../Assets/images/logo.png" alt="logo" height="40" width="150" margin="50px"/>
        </Box>
            </MobiLogoImg>
       
      
        < MobiBankerImg>
        <img src="../../Assets/images/logo.png" alt="logo" height="40" width="150" />
        </MobiBankerImg>
        </StyledToolbar>
       
    </AppBar>
  )
}

export default TopNav