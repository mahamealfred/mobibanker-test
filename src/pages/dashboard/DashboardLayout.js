import React, { useState,lazy } from 'react';

// @mui
import { styled } from '@mui/material/styles';
//
// import Header from './header';
// import Nav from './nav';

// ----------------------------------------------------------------------

import {useEffect,useRef} from "react";
import jwt from "jsonwebtoken";

import {  Box, Button, Modal, Typography } from '@mui/material';

import { useHistory } from 'react-router-dom';
import { useTranslation } from "react-i18next";
//import FireNotification from '../../components/Notifications/FirebaseNotification';
import { useContext } from 'react';
import AuthContext from '../../context';
import { useSelector } from 'react-redux';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import { useIdleTimer } from 'react-idle-timer';
import i18next from "i18next";


const FireNotification=lazy(()=>import("../../components/Notifications/FirebaseNotification"));
const Nav=lazy(()=>import("./nav"));
const Header=lazy(()=>import("./header"));
const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;
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

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout({...props}) {

  const [open, setOpen] = useState(false);
  const { i18n,t } = useTranslation(["home","common","login"]);
  const history=useHistory();
  const login=useSelector((state)=>state.login)
  const [agentName,setAgentName]=useState("");
  const [username,setUsername]=useState("")
const [brokering,setBrokering]=useState("")
const [userGroup,setUserGroup]=useState("");
const [openPageReflesh, setOpenPageReflesh] = useState(false)
const handleClosePageReflesh = () => setOpenPageReflesh(false);
 const { auth,setAuth }=useContext(AuthContext)
const {children}=props
//nutral


useEffect(()=>{
  if(login.users.length === 0){
    setOpenPageReflesh(true)
  }

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
          phonenumber:login.users.resData.data.phonenumber,
          image:login.users.resData.data.image,
          basicAuth:login.users.basicAuth 
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
    <StyledRoot>
      <FireNotification/>
<Modal
        open={openPageReflesh}
       // onClose={handleClosePageReflesh}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          {t("common:yoursessionhastimedout")}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {t("common:pleaseloginagain")}
          </Typography>
          <Button 
              sx={{
                width:"100%",
                height:"30px",
                borderRadius: 0.5
              }}
          onClick={handleLogoutPage} variant="contained">
            {t("login:login")}</Button>
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
          <Box sx={styles}>
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
      <Header onOpenNav={() => setOpen(true)} />
      <Nav openNav={open} onCloseNav={() => setOpen(false)} />
      <Main>
       {children}
      </Main>
    </StyledRoot>
  );
}
