import { AppBar, Toolbar,styled,Box, Typography,Avatar} from '@mui/material'
import React from 'react'
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { CloseOutlined } from '@mui/icons-material';
import NativeSelect from '@mui/material/NativeSelect';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
const TopNav = () => {
  const [language, setLanguage] = React.useState('');
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
        <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth>
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
          <option value={30}>French</option>
        </NativeSelect>
      </FormControl>
        </Box>
        {/* <img src="../../Assets/images/mobibanker.png" alt="logo" height="50" width="200" /> */}
        </MobiBankerImg>
        
        </StyledToolbar>

       
    </AppBar>
  )
}

export default TopNav