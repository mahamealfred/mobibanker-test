import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
// import logo from "../../images/mobibk.png"
import { Button} from '@mui/material';
import { useHistory} from 'react-router-dom';
//import login from "../../assets/images/login.png";

function Index() {
//   const navigate=useNavigate()
  // const [anchorElNav, setAnchorElNav] = React.useState(null);
  // const [anchorElUser, setAnchorElUser] = React.useState(null);

  // const handleOpenNavMenu = (event) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  // const handleOpenUserMenu = (event) => {
  //   setAnchorElUser(event.currentTarget);
  // };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  // const handleCloseUserMenu = () => {
  //   setAnchorElUser(null);
  // };
  const handleLogin=()=>{
    // navigate("/authentication-signin")
  }
  const handleSignUp=()=>{
    // navigate("/signup-selection")
  }


  return (
<Box >
<AppBar position="sticky"  sx={{backgroundColor:"white"}}  elevation={1}>
  <Toolbar>
    {/* <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      sx={{ mr: 2 }}
    >
      <MenuIcon />
    </IconButton> */}
     <Box
            component="img"
            sx={{
            height: 80,
            display:"flex",
            objectFit:"contain",
            flexGrow: 0.5
            }}
            alt="Your logo."
            src="../../images/mobibk.png"
        />
    {/* <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
      News
    </Typography> */}
    <Box sx={{  flexGrow: 0,marginLeft:{xs:0,sm:20,md:70}}}>
    <Tooltip title="Login">
               <IconButton onClick={handleLogin} sx={{ p: 0 }}>
               <Avatar     size="small" sx={{ bgcolor:"#35A745", fontSize:"12px" }}>Login</Avatar>
               </IconButton>
             </Tooltip>    
    </Box>
    <Box sx={{  flexGrow: 0,marginLeft:5,display:{xs:"none",sm:"flex"}}}>
    <Tooltip title="Sign Up">
    <Button   size="medium" onClick={handleSignUp} sx={{  bgcolor:"#35A745", boxShadow: 5,"&:hover": {backgroundColor: "#35A745", } }} variant="contained">SIGN UP</Button>
    </Tooltip>    
    </Box>
  </Toolbar>
</AppBar>
</Box>
   
  );
}
export default Index;