import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Tooltip from "@mui/material/Tooltip";
import NativeSelect from '@mui/material/NativeSelect';
import FormControl from '@mui/material/FormControl';

import AppDrawer from '../../components/drawer';
import {useEffect,useRef} from "react";
import jwt from "jsonwebtoken";
import Stack from '@mui/material/Stack';
import { Avatar, Button } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import Badge from '@mui/material/Badge';
import {

  justifyCenter,
  fullWidthFlex,
} from '../../components/styles/theme';
import LogoutIcon from '@mui/icons-material/Logout';
import { useHistory } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import ListItems from './ListItems';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
//Modal
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useIdleTimer } from 'react-idle-timer';
import i18next from "i18next";
import Link from '@mui/material/Link';
import { refreshTokens } from '../../redux/actions/loginAction';
import AuthContext from '../../context';
import { useContext } from 'react';
import { useSelector } from 'react-redux';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.mobicashonline.com/">
      www.mobicashonline.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const styles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const style = {
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  position: 'absolute',
  bgcolor: 'background.paper',
  justifyContent:"center",
  // border: '2px solid #000',
  //boxShadow: 24,
  p: 4,
};
const drawerWidth = 250;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);
const mdTheme = createTheme();

function Home({...props}) {
  const { i18n,t } = useTranslation(["home","common","login"]);
 const history=useHistory();
 const login=useSelector((state)=>state.login)
  const [open, setOpen] = React.useState(false);
  const [agentName,setAgentName]=React.useState("");
  const { children } = props;
 const [authToken,setAuthToken]=React.useState(null)
const [username,setUsername]=React.useState("")
const [brokering,setBrokering]=React.useState("")
const [userGroup,setUserGroup]=React.useState("");
const [openPageReflesh, setOpenPageReflesh] = React.useState(false)
const handleClosePageReflesh = () => setOpenPageReflesh(false);
 const { auth,setAuth }=useContext(AuthContext)
 
 useEffect(()=>{
  if(login.users.length === 0){
    setOpenPageReflesh(true)
  }
  // if ( window.performance) {
  //   if (login.users.length==0 && performance.navigation.type == 1) {
  //     setOpenPageReflesh(true)
  //   } 
  // }
 },[])
 useEffect(() => {
  async function fetchData() {
    if (!login.loading) {
      if (login.users.length !== 0) {
        if (login.users.resData.responseCode === 100) {
          setAuth({username:login.users.resData.data.username,
          brokering:login.users.resData.data.brokering,
          usergroup:login.users.resData.data.group,
          password:login.users.password,
          email:login.users.resData.data.email,
          names:login.users.resData.data.names,
          phonenumber:login.users.resData.data.phonenumber
        })
         setUsername(login.users.resData.data.username)
         setBrokering(login.users.resData.data.brokering)
         setUserGroup(login.users.resData.data.group)
        } else {
          return null;
        }
      
      }
    
    }
  }
  fetchData();
 
}, [login.users]);

  //refresh token
  var startTimer=null
  // set idle timer
  const [openModal,setOpenModal]=React.useState(false)
  const handleClose=()=>{
    setOpenModal(false)
        }
  const idleTimerRef=useRef(null)
  const onIdle=()=>{
  setOpenModal(true)

  }
  const handleStopTime=()=>{
  clearInterval(startTimer)
  }
  useEffect(()=>{
if(openModal===true){
  handelClock(0,1,0)
}
if (localStorage.getItem("i18nextLng")?.length > 2) {
  i18next.changeLanguage("ki");
}
  },)

  const IdleTimer = useIdleTimer({
    crossTab: true,
    ref: idleTimerRef,
     timeout:  5 * 60 * 1000,
    // timeout:  5 * 1000,
    onIdle: onIdle
  })
  const handelClock=(hr, mm, ss)=>{
    function startInterval(){
       startTimer=setInterval(function(){
        if(hr==0 && mm==0 && ss==0){
          handleStopTime();
        }
        else if(ss!=0){
          ss--;
        }
        else if(mm !=0 && ss==0){
          ss=59;
          mm--;
        }
        else if(hr !=0 && mm ==0){
          mm =60;
          hr--;
        }
        if (hr.toString().length < 2) hr = "0" + hr;
        if (mm.toString().length < 2) mm = "0" + mm;
        if (ss.toString().length < 2) ss = "0" + ss;
       // setRemainingTime(hr + " : " + mm + " : " + ss);
       if(mm=="00" && ss=="00"){
        localStorage.removeItem('mobicashAuth');
        sessionStorage.removeItem('mobicash-auth')
        return history.push('/',{push:true})
       }
      }, 1000);
    }
    startInterval();
  }
const handleContinue=()=>{
handleStopTime()
setOpenModal(false)
}

  const toggleDrawer = () => {
 
    setOpen(!open);
  };
  const handleLanguageChange = (e) => {
		i18n.changeLanguage(e.target.value);
	};
  const handleLogout=()=>{
    localStorage.removeItem('mobicashAuth');
    sessionStorage.removeItem('mobicash-auth')
   return history.push('/display',{push:true})
  }
  const handleLogoutPage=()=>{
    localStorage.removeItem('mobicashAuth');
    sessionStorage.removeItem('mobicash-auth')
   return history.push('/',{push:true})
  }

  const decode= (token) => {
    const JWT_SECRET="tokensecret";
    const payload = jwt.verify(token, JWT_SECRET);
     return payload;
  }
  useEffect(() => {

    const token =localStorage.getItem('mobicashAuth');
    if (token) {
    const {name}=decode(token);
    setAgentName(name)
  }
 
  }, []);


  return (
    <ThemeProvider theme={mdTheme}>

<Modal
        open={openPageReflesh}
       // onClose={handleClosePageReflesh}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Your session has timed out.
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Please login again
          </Typography>
          <Button onClick={handleLogoutPage} variant="contained">Login</Button>
        </Box>
      </Modal>
      {/* <IdleTimer ref={idleTimerRef}/> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
       // onClose={handleClose}
        closeAfterTransition
       
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
          
            <Typography id="transition-modal-title" textAlign="center" variant="h6" component="h2">
         {t("common:youareabouttobesignedout")}
            </Typography>
            <Typography id="transition-modal-description" textAlign="center" sx={{ mt: 2 }}>
            {t("common:forsecurityreasons")}
            </Typography>
            <Box
           sx={{
           display: 'flex',
           justifyContent:"center",
           padding:"10px 0px 5px",
        '& > *': {
          m: 1,
        },
      }}
    >
              <Button 
               sx={{
                width:"100%",
                height:"40px",
                borderRadius: 50
              }}
              onClick={handleLogout}
              >{t("common:signedmeout")}</Button>
              <Button variant='text'
              sx={{
                width:"100%",
                height:"40px",
                borderRadius: 50
              }}
            onClick={handleContinue}
              >{t("common:continue")}</Button>
       </Box>
          </Box>
        </Fade>
      </Modal>
     
      <Box sx={{ display: 'flex' ,height:"auto"}}>
        {/* <CssBaseline /> */}
        <AppBar position="fixed" open={open} elevation={2} sx={{ backgroundColor: 'white', display: 'flex',borderRadius:1 }} >
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            <IconButton
              edge="start"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '26px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              <Box
                component="img"
                sx={{
                  marginLeft:8,
                  objectFit:"contain",
                  maxHeight: { xs: 100, md: 100},
                  maxWidth: { xs: 200, md: 200},
                  display:{xs:"none",sm:"block"}
                }}
                alt="mobicash logo"
                src="../../images/mobibk.png"
              />
            </Typography>
         
  <Box sx={{ display: { xs: 'flex', md: 'flex' }, padding:1}}>
         <Tooltip title={t("common:logout")} sx={{ mt: 1,display: { xs: 'none', md: 'none' } }}>
       <IconButton   onClick={handleLogout} size="large" aria-label="show 4 new mails"  sx={{color:"#F9842C"}} >
              {/* <LogoutIcon  sx={{color:"#F9842C"}} /> */}
              <Avatar    size="small" sx={{ bgcolor:"#F9842C", fontSize:"12px" }}>Logout</Avatar>
            </IconButton>
         </Tooltip>
          </Box>
            <Box sx={{ minWidth: 100, display: { xs: "none", sm: "none",md:"block" } }}>
               <Box sx={{
        ...fullWidthFlex,
        // borderTop: '1px solid #ddd',
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
                  defaultValue="ki"
                  value={localStorage.getItem("i18nextLng")}
                  onChange={handleLanguageChange}
                  >
              <option value="ki">Kinyarwanda</option>
              <option value="en">English</option>
              <option value="fr">Français</option>
                  </NativeSelect>
                </FormControl>
              </Button>
            </Paper>
          </Stack>
      </Box>
            </Box >
            <Box
              sx={{ minWidth: 100, display: { xs: "block", sm: "none" } }}
            >
              <img src="../../images/img_144.png" alt="logo" height="40" width="40" margin="10px" />
            </Box>
          </Toolbar>
        </AppBar>
 <Drawer 
          variant="permanent"
         ModalProps={{
           keepMounted: true,
         }}
        open={open} >
          <Toolbar
            sx={{
              backgroundColor: '#F9842C',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height:{ xs: "50px", sm: "60px",md:"80px" },
              px: [0],
            }}
          >

            <IconButton onClick={toggleDrawer}>

              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav" >
            {/* {mainListItems} */}
            <ListItems open={open}/>
          
            {/* <Divider sx={{ my: 1 }} /> */}
            {/* {secondaryListItems} */}
          </List>
          <AppDrawer />
        </Drawer>
        
      
       
        <Box
          component="main"
          sx={{
            backgroundColor: "transparent",
            flexGrow: 0,
            height: '100%',
            overflow: 'hidden'
          }}
        >
          <Toolbar />

          <Box
          component="main"
          sx={{
            backgroundColor: "transparent",
            flexGrow: 0,
            height: '100%',
            overflow: 'hidden'
          }}
        >
<Box sx={{ width: '100%', maxWidth: 560, bgcolor: 'transparent',alignItems:"center", marginTop:"35px", height: 'auto'}}>
            <Box sx={{ my: 1, mx: 2 }}>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography gutterBottom variant="h6" color="gray" component="div">
                    
                  {t("common:welcometomobibanker")}
                  </Typography>
                  <Typography gutterBottom variant="body1" color="gray" component="div">
                  {agentName}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Divider variant="middle" />
          </Box>
        </Box>
         {/* rendser home component */}
        {children}
          </Box>  
      </Box>
 
       <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          MobiBanker
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
           {t("common:solutionsthatnevermisstheaim")}
        </Typography>
        <Copyright />
      </Box>
    </ThemeProvider>
  );
}

export default  Home;