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
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems, secondaryListItems} from './listItem';
import Tooltip from "@mui/material/Tooltip";
import Widget from '../../components/widget/Widget';
import NativeSelect from '@mui/material/NativeSelect';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Service from '../services/Service';
import BottomNav from '../../components/bottomNav/BottomNav';
import Footer from '../../components/footer/Footer';
import AppDrawer from '../../components/drawer';
import { DashboardAppbarContainer } from '../../components/styles/appbar';
import DashboardBanner from "../../components/dashboardbanner";
import { Colors } from '../../components/styles/theme';
import {useEffect,useRef} from "react";
import jwt from "jsonwebtoken";
import Stack from '@mui/material/Stack';
import { Button, ButtonGroup } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MobicashSolutions from '../../components/mobicashsolutions';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import {
  flexBetweenCenter,
  justifyCenter,
  fullWidthFlex,
} from '../../components/styles/theme';
import Headerbanner from "../../components/headerbanner";
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import LogoutIcon from '@mui/icons-material/Logout';
import { useHistory } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import ListItems from './ListItems';
import Slider from '../../components/slider/Slider';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
//Modal
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import { useIdleTimer } from 'react-idle-timer';
import ReactModal from 'react-modal';
import WarningIcon from '@mui/icons-material/Warning';
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
  const [open, setOpen] = React.useState(true);
  const [agentName,setAgentName]=React.useState("");
  const { children } = props;
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
  },)

  const IdleTimer = useIdleTimer({
    crossTab: true,
    ref: idleTimerRef,
     timeout:  10 * 60 * 1000,
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
             You'are about to be signed out,
            </Typography>
            <Typography id="transition-modal-description" textAlign="center" sx={{ mt: 2 }}>
         For security reasons, your connection times out after you have been
         inactive for a while. Click Continue to stay signed in.
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
              >Signed me Out</Button>
              <Button variant='text'
              sx={{
                width:"100%",
                height:"40px",
               
                borderRadius: 50
              }}
            onClick={handleContinue}
              >Continue</Button>
       </Box>
          </Box>
        </Fade>
      </Modal>
     
      <Box sx={{ display: 'flex' ,height:"auto"}}>
        {/* <CssBaseline /> */}
        <AppBar position="fixed" open={open} elevation={0} sx={{ backgroundColor: 'white', display: 'flex',borderRadius:2 }} >
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
                marginRight: '36px',
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
                  height: 80,
                  width: 250,
                  marginLeft: 0,
                  maxHeight: { xs: 60, md: 300 },
                  maxWidth: { xs: 150, md: 220 },
                  display: { xs: "none", sm: "none",md:"block"}
                }}
                alt="mobicash logo"
                src="../../Assets/images/logo.png"
              />
            </Typography>
            <Box
              component="img"
              sx={{
                height: 100,
                width: 300,
                marginRight: 10,
                maxHeight: { xs: 60, md: 300},
                maxWidth: { xs: 150, md: 300},
                display: { xs: "none", sm: "none", md: "block" }
              }}
              alt="mobicash logo"
              src="../../Assets/images/mobibk.png"
            />
  <Box sx={{ display: { xs: 'flex', md: 'flex' }, padding:2}}>
         <Tooltip title={t("common:logout")} sx={{ mt: 1,display: { xs: 'none', md: 'none' } }}>
       <IconButton   onClick={handleLogout} size="large" aria-label="show 4 new mails"  sx={{color:"#F9842C"}} >
              <LogoutIcon  sx={{color:"#F9842C"}} />
            </IconButton>
         </Tooltip>
         <Tooltip title={t("common:messages")} sx={{ mt: 1 }}>
         <IconButton
              size="large"
              aria-label="show 3 new notifications"
              sx={{color:"#F9842C"}} 
            >
              <Badge badgeContent={3} color="warning">
                <MailOutlineIcon title="Notifications" />
              </Badge>
            </IconButton>
          </Tooltip>
            
          </Box>

            <Box sx={{ minWidth: 100, display: { xs: "none", sm: "none",md:"block" } }}>
               <Box sx={{
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
              <img src="../../Assets/images/img_144.png" alt="logo" height="40" width="40" margin="10px" />
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
              height:{ xs: "50px", sm: "60px",md:"100px" },
              px: [1],
            }}
          >
            {/* <Typography variant="h6" textAlign="center" noWrap component="div"  >
            {t("common:mobibankermenu")}
            </Typography> */}
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
      {/* <BottomNav /> */}
      {/* <Slider/> */}
      {/* <MobicashSolutions/> */}
      {/* <Headerbanner/>
      <Footer /> */}
    </ThemeProvider>
  );
}

export default  Home;