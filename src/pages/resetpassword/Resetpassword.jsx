import  React,{lazy} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import   CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles'
//import TopNav from '../../components/topNav/TopNav';
import { useHistory } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import {useState,useEffect} from "react";
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import AuthApi from '../../context/api';
import jwt from 'jsonwebtoken';
import { useTranslation } from "react-i18next";
import { resetPasswordAction } from '../../redux/actions/resetPasswordAction';
const TopNav =lazy(()=>import("../../components/topNav/TopNav"));
const Resetpassword= () => {
    const history=useHistory()
    const { t } = useTranslation(["home","common","login"]);
    const dispatch=useDispatch();
    const login=useSelector((state)=>state.login)
    const resetPassword=useSelector((state)=>state.resetPassword);
    const forgotPassword=useSelector((state)=>state.forgotPassword)
    const [username,setUsername]=useState();
    const [password,setPassword]=useState();
    const [usernameError,setUsernameError]=useState();
    const [passwordError,setPasswordError]=useState();
    const [errMessage,setErrMessage]=useState('')
    const [successMessage,setSuccessMessage]=useState('')
    const [opensuccessMessage,setOpensuccessMessage]=useState(false)
    const [open, setOpen] = React.useState(true);
    const [openMessage, setOpenMessage] = React.useState(true);
    const [codeError,setCodeError]=useState('');
    const [cpasswordError,setCpasswordError]=useState('');
    var startTimer=null
    const decode= (token) => {
      const JWT_SECRET="forgotpasswordtokensecret";
      const payload = jwt.verify(token, JWT_SECRET);
       return payload;
    }
    useEffect(() => {
      const token =sessionStorage.getItem('FUPR/MOBICORE/AUTH');
      if (token) {
      const {username}=decode(token);
      setUsername(username)
    }
    }, []);

      const handleSubmit = async(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          if(data.get('code')==="" &&  data.get('password')==="" && data.get('confirmPassword')==="" ){
            setCodeError("Code is required")
            setPasswordError("Pin is required")
            setCpasswordError("Confirmation pin is required")
          }
          else if(data.get('code')=="" ){
            setCodeError("Code is required")
          }
          else if(data.get('password')=="" ){
            setPasswordError("Pin is required")
          }
          else if(data.get('confirmPassword')=="" ){
            setCpasswordError("Confirmation pin is required")
          }
          else if(data.get('confirmPassword')!==data.get('password') ){
            setCpasswordError("Pin do not macth")
          }
          else{
            setCodeError("")
            setPasswordError("")
            setCpasswordError("")
           await dispatch(resetPasswordAction({code: data.get('code'),password: data.get('password'),cpassword:data.get('confirmPassword'),username},history));
            // console.log("authenticstion",Auth.auth)
          }
         
          if(resetPassword.error){
            setOpen(true);
          }
        };
     
        const handleClose=()=>{
          setOpen(false)
          setOpenMessage(false)
          setOpensuccessMessage(false)
        }
        const theme = createTheme();
        useEffect(()=>{
          function fecthData(){
       if(!resetPassword.loading){
        if(resetPassword.details.responseCode===100){
          setSuccessMessage("Awesome, You've successfully updated your Pin")
          setOpenMessage(false)
          setOpensuccessMessage(true)
          handelClock(0,0,8)
        }
        
       }
      
          }
          fecthData()
             },[resetPassword.details])
               //hhandle timer
         const handleStopTime=()=>{
          clearInterval(startTimer)
          }
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
              sessionStorage.removeItem('FUPR/MOBICORE/AUTH')
              return history.push('/',{push:true})
             }
            }, 1000);
          }
          startInterval();
        }
    return (
      <React.Fragment>
        <TopNav/>
        <ThemeProvider theme={theme}>
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
{/* here */}
<Grid
  container
  direction="column"
  alignItems="center"
  justifyContent="center"
  sx={{ height: '70vh', backgroundColor:'primary' }}

>
  <Grid item xs={3}>
    {
      successMessage?null:
      <Typography component="h1" textAlign="center" variant="h5" color="gray">
      Reset PIN
        </Typography>
    }
           {
                 !resetPassword.error? null:
                  <Collapse in={open}>
                  <Alert
                  severity="error"
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={handleClose}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                    sx={{ mb: 0.2 }}
                  >
                   {resetPassword.error}
                  </Alert>
                </Collapse>
               }  
                {
                forgotPassword.details?
                  <Collapse in={openMessage}>
                  <Alert
                  severity="success"
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={handleClose}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                    sx={{ mb: 0.2 }}
                  >
                 We want to make sure it's really you. In order to verify your
                 identity, enter the verification code that was sent to {forgotPassword.details.data.sentTo[0]} 
                  </Alert>
                </Collapse>:null
               } 
                {
                successMessage?
                  <Collapse in={opensuccessMessage}>
                  <Alert
                  severity="success"
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={handleClose}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                    sx={{ mb: 0.2 }}
                  >
              {successMessage}
                  </Alert>
                </Collapse>:null
               }    
                    
           <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
           {
                successMessage?null:
                <>
                <TextField
               margin="normal"
               required
               fullWidth
               id="username"
               label= "Code"
               name="code"
               autoComplete="code"
               autoFocus
               error={codeError?codeError:""}
               helperText={codeError?codeError:""}
             />
              <TextField
               margin="normal"
               required
               fullWidth
               id="username"
               label= "New pin"
               name="password"
               autoComplete="password"
               type="password"
               autoFocus
               error={passwordError?passwordError:""}
               helperText={passwordError?passwordError:""}
             />
             <TextField
               margin="normal"
               required
               fullWidth
               id="username"
               label= "Confirmation pin"
               type="password"
               name="confirmPassword"
               autoComplete="confirmPassword"
               autoFocus
               error={cpasswordError?cpasswordError:""}
               helperText={cpasswordError?cpasswordError:""}
             />

               {!resetPassword.loading? 
               <Button
               type="submit"
               fullWidth
               variant="contained"
               color="warning"
               sx={{ mt: 3, mb: 2 }}
              
             > Submit</Button>: 
             <Box sx={{ display: 'flex',justifyContent:"center" }}>
             <CircularProgress  sx={{ color: 'orange' }} />
              </Box>
             }
                </>
               } 
              
             <Grid container>
               <Grid item xs>
                 <Link href="/" variant="body2">
             Go to Login page
                 </Link>
               </Grid>
               
             </Grid>
           </Box>
      </Grid>     
</Grid>   
        </Box>
        </CardContent>
        </Grid>

    </ThemeProvider>
      </React.Fragment>
     
    )
  }
  
  export default Resetpassword