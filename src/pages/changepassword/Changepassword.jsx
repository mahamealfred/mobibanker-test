import React, { useContext } from 'react'
import { Send } from '@mui/icons-material';
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
// import { login, register } from '../../actions/user';
// import { useValue } from '../../context/ContextProvider';
// import GoogleOneTapLogin from './GoogleOneTapLogin';
 import PasswordField from './PasswordField';
 import { changePasswordAction } from '../../redux/actions/changePasswordAction';
 import { useDispatch,useSelector } from 'react-redux';
 import { useHistory } from 'react-router-dom';
 import { useTranslation } from "react-i18next";
 import jwt from "jsonwebtoken";
import AuthContext from '../../context';
const Changepassword = () => {
  const { i18n,t } = useTranslation(["home","common","login"]);
  const {auth}=useContext(AuthContext)
    const history=useHistory()

  const [errorMessage,setErrMessage]=useState("");
  const [open, setOpen] = React.useState(false);
  const [openErrorMessage, setOpenErrorMessage] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [successFullMessage,setSuccessFullMessage]=useState("")
  const [openSuccess,setOpenSuccess]=useState(false)
  const oldPasswordRef=useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [username,setUsername]=useState("")
  var startTimer=null
  const dispatch=useDispatch();
  const changePassword=useSelector((state)=>state.changePassword)
  const [oldpass,setOldpass]=useState("")

  const handleClose = () => {
    changePassword.error=''
setOpen(false)
setOpenError(false)
setOpenSuccess(false)
setOpenErrorMessage(false)

  }
      const handleSubmit = async(e) => {
        e.preventDefault();
        const oldPassword = oldPasswordRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        console.log("confirm psss ",password,confirmPassword)
        if (password !== confirmPassword){
          setErrMessage("The new PIN and confirmation PIN do not match")
          setOpenErrorMessage(true)
        }
       if(auth.password !== oldPassword){
          setErrMessage("Invalid Old Pin")
          setOpen(true)
        } 
  
        else{
          setErrMessage("")
          await dispatch(changePasswordAction({oldPassword,password,confirmPassword},username))
        }
        if(errorMessage){
        setOpenErrorMessage(true)
        }
        if(changePassword.error){
          setOpenError(true)
                  }
      };
      useEffect(()=>{
   function fecthData(){
if(changePassword.error){
  setOpenError(true)
}
if(errorMessage==''){
  setOpen(false)
}
   }
   fecthData()
      },[!changePassword.error])
      const decode= (token) => {
        const JWT_SECRET="tokensecret";
        const payload = jwt.verify(token, JWT_SECRET);
         return payload;
      }
      useEffect(() => {
     
        if (auth) {
        const usernm=auth.username
        setUsername(usernm)
        
      }
     
      },[]);
      useEffect(()=>{
        function fecthData(){
     if(!changePassword.loading){
      if(changePassword.details.responseCode===100){
        setSuccessFullMessage("You have successfuly change your password")
        setOpenSuccess(true)
        handelClock(0,0,4)
      }
      
     }
    
        }
        fecthData()
           },[changePassword.details])


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
                changePassword.details=['']
                localStorage.removeItem('mobicashAuth');
                sessionStorage.removeItem('mobicash-auth')
                return history.push('/',{push:true})
               }
              }, 1000);
            }
            startInterval();
          }
           
  return (
   <React.Fragment>
    <Grid container spacing={2}
    justifyContent="center"
    >
  <Grid item xs={8}>
  <form onSubmit={handleSubmit}>
  <Typography gutterBottom textAlign="center" variant="h6">
              Change PIN
            </Typography>
        <DialogContent dividers>
          {
            successFullMessage?null:
            <DialogContentText>
            {t("common:pleasefillyourinformationinthefieldsbelow")}:
          </DialogContentText>
          }
         
          {
                  !changePassword.error? null:
                   <Collapse in={openError}>
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
                       {changePassword.error}
                    {/* {changePassword.error==="FAILURE"?"The given pin was already used":changePassword.error} */}
                   </Alert>
                 </Collapse>
                }    
                 {
                  !errorMessage? null:
                   <Collapse in={openErrorMessage}>
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
                    {errorMessage}
                   </Alert>
                 </Collapse>
                }    
                  {
                  !successFullMessage? null:
                   <Collapse in={openSuccess}>
                   <Alert
                   severity="success"
                    //  action={
                    //    <IconButton
                    //      aria-label="close"
                    //      color="inherit"
                    //      size="small"
                    //      onClick={handleClose}
                    //    >
                    //      <CloseIcon fontSize="inherit" />
                    //    </IconButton>
                    //  }
                     sx={{ mb: 0.2 }}
                   >
                  {successFullMessage}
                   </Alert>
                 </Collapse>
                }   
                {
                  successFullMessage?null:<>
                   <TextField
              autoFocus
              margin="normal"
              variant="standard"
              id="name"
              label={t("common:oldpassword")}
              type="text"
              fullWidth
              inputRef={oldPasswordRef}
              inputProps={{ minLength: 2 }}
              required
            />
       
          <PasswordField {...{ passwordRef}} lb={t("common:newpassword")}  />
         
            <PasswordField
              passwordRef={confirmPasswordRef}
              id="confirmPassword"
              label={t("common:confirmpassword")}
            
            />
                  </>
                }
           
         
        </DialogContent>
        {
          successFullMessage?null:
          <DialogActions sx={{ px: '19px' }}>
          {
            changePassword.loading?"Loading":
            <Button type="submit" variant="text"  sx={{color:"#F9842C"}}  >
           {t("common:submit")}
          </Button>
          }
          
        </DialogActions>
        }
        
      </form>
  </Grid>
  </Grid>
    
   </React.Fragment>
  )
}

export default Changepassword