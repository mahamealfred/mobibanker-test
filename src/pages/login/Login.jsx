import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useHistory } from 'react-router-dom';
import { loginAction } from '../../redux/actions/loginAction';
import { useDispatch,useSelector } from 'react-redux';
import {useState,useEffect,useContext} from "react";
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import { useTranslation } from "react-i18next";
import { useInterval } from "./customHooks";
import AuthContext from '../../context';
import Paper from "@mui/material/Paper"
import {  styled } from '@mui/material/styles';
import LanguagePopover from '../dashboard/header/LanguagePopover';
import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { changePasswordAction } from '../../redux/actions/changePasswordAction';

const TIMEOUT_SECONDS = 15;
const SignIn = () => {
    const history=useHistory()
    const { t } = useTranslation(["home","common","login"]);
    const dispatch=useDispatch();
    const login=useSelector((state)=>state.login)
    const changePassword=useSelector((state)=>state.changePassword)
    const [usernameError,setUsernameError]=useState();
    const [passwordError,setPasswordError]=useState();
    const [open, setOpen] = React.useState(true);
    const [remainingSeconds, setRemainingSeconds] = useState(TIMEOUT_SECONDS);
    const [pending, setPending] = useState(false);
  
    const [error, setError] = useState(null);
    const [openResetDialog,setOpenResetDialog]=useState(false)
    const [resetErrorMessage,setResetErrorMessage]=useState("")
    const [operesetErrorMessage,setOperesetErrorMessage]=useState(true)
    const [username,setUsername]=useState("")
    const [oldPassword,setOldPassword]=useState("")
    const [newpassword,setNewpassword]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState("")

    const [resetpasswordError,setResetpasswordError]=useState("")
    const [oldPasswordError,setOldPasswordError]=useState("")
    const [confirmPasswordError,setConfirmPasswordError]=useState("")
    const [resetUsernameError,setResetUsernameError]=useState("")
    const [openError,setOpenError]=useState(false)
    const [openSuccess,setOpenSuccess]=useState(false)
    const [ successFullMessage,setSuccessFullMessage]=useState("")
    //const []
    //authentication
    const handleClosresetErrorMessage=()=>{

    }
    const { setAuth,auth } = useContext(AuthContext);
   

      const handleSubmit = async(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          setUsername(data.get('username'))
          if(data.get('username')=="" &&  data.get('password')=="" ){
            setUsernameError(`${t("login:usernameisrequired")}`)
            setPasswordError(`${t("login:passwordisrequired")}`)
          }
          else if(data.get('username')=="" ){
            setUsernameError(`${t("login:usernameisrequired")}`)
          }
          else if(data.get('password')=="" ){
            setPasswordError(`${t("login:passwordisrequired")}`)
          }
          else{
            setUsernameError("")
            setPasswordError("")
            setPassword(data.get('password'))
           // login.error=""
           login.loading=true
            setError(null);
            setRemainingSeconds(TIMEOUT_SECONDS);
            await dispatch(loginAction({username: data.get('username'),password: data.get('password')},history));
           
          }
         
          if(login.error){
            setOpen(true);
          }
          if(error){
            setOpen(true);
          }
          if(login.error==="reset"){
            setOpenResetDialog(true);
          }
        };
       
        const handleClose=()=>{
          setOpenSuccess(false)
          setOpenError(false)
          setOpen(false)

        }
        const theme = createTheme();
        useEffect(()=>{
          function fecthData(){
       if(changePassword.error){
         setOpenError(true)
       }
 
          }
          fecthData()
             },[!changePassword.error])
useEffect(()=>{
  if(login.error==="reset"){
    setOpenResetDialog(true);
  }
},[login.error])
//handle success pin chnages
useEffect(()=>{
  function fecthData(){
if(!changePassword.loading){
if(changePassword.details.responseCode===100){
  login.error=['']
  setOpen(false)
  setOpenResetDialog(false)
  setSuccessFullMessage("Resetting your PIN was successful.")
  setOpenSuccess(true)

}

}

  }
  fecthData()
     },[changePassword.details,login.error])


//handle reset Pin
        const handleResetPin=async()=>{
           if(oldPassword===""){
            setOldPasswordError("Old Pin is required")
          }
          else if(newpassword===""){
            setResetpasswordError("New Pin is required")
          }
          else if(newpassword!==confirmPassword){
        setConfirmPasswordError("The new PIN and confirmation PIN do not match ")
          }  
          else{
            setOldPasswordError("")
            setResetpasswordError("")
            setConfirmPasswordError("")
            await dispatch(changePasswordAction({oldPassword,password:newpassword,confirmPassword},username))
          }
            if(changePassword.error){
              setOpenError(true)
                      }
        }
    return (
      <React.Fragment>
<Dialog
        open={openResetDialog}
       // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="46" color="gray" textAlign="center"   >
             RESET PIN
          </Typography>
        </DialogTitle>
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
{/*  
{   !resetErrorMessage ? null : (
                <Collapse in={operesetErrorMessage}>
                    <Alert severity="error"
                        action={
                            <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"onClick={handleClosresetErrorMessage}>
                        <CloseIcon
                        fontSize="inherit"/></IconButton>
                        }
                        sx={
                            {mb: 0.2}
                    }>
                        {resetErrorMessage}  
                        </Alert>
                </Collapse>
            )
        } */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
      
          <TextField
      margin="normal"
      variant="standard"
      id="1i"
      label="Old PIN"
      type="text"
      fullWidth
      required
      value={oldPassword}
      onChange={(e)=>setOldPassword(e.target.value)}
      helperText={oldPasswordError? oldPasswordError : ""}
      error={oldPasswordError}
   
    />
    <TextField
      margin="normal"
      variant="standard"
      id="1i"
      label="New PIN"
      type="password"
      fullWidth
      required
      value={newpassword}
      onChange={(e)=>setNewpassword(e.target.value)}
      helperText={resetpasswordError? resetpasswordError : ""}
      error={resetpasswordError}
   
    />
    <TextField
      margin="normal"
      variant="standard"
      id="1i"
      label="Confirm PIN"
      type="password"
      fullWidth
      required
      value={confirmPassword}
      onChange={(e)=>setConfirmPassword(e.target.value)}
      helperText={confirmPasswordError? confirmPasswordError : ""}
      error={confirmPasswordError}
   
    />
{!changePassword.loading? 
           <Button
           type="submit"
           fullWidth
           variant="contained"
           color="warning"
           sx={{ mt: 3, mb: 2 }}
           onClick={handleResetPin} 
         > Reset</Button>: 
         <Box sx={{ display: 'flex',justifyContent:"center" }}>
         <CircularProgress  sx={{ color: 'orange' }} />
          </Box>
        }
          </DialogContentText>
        </DialogContent>
      </Dialog>
        <ThemeProvider theme={theme}>

                  {/* reseting in    */}
          {/* <Paper elevation={1} style={{ borderRadius: 10}}> */}
          <Grid container component="main" sx={{ height: 'auto', backgroundColor:'primary' }}>
     <Box
       sx={{
         my: 8,
         mx: 4,
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center',
       }}
     >
       <Typography component="h1" variant="h5" >
        {t("login:signin")} 
       </Typography>
       {
             !successFullMessage? null:
              <Collapse in={openSuccess}>
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
               {/* {login.error==="Password is temporarily blocked"?`${t("login:blockedmessage")}`:`${t("login:invalidusernameandpassword")}`} */}
               {successFullMessage}
              </Alert>
            </Collapse>
           } 
       {
             !login.error? null:
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
               {/* {login.error==="Password is temporarily blocked"?`${t("login:blockedmessage")}`:`${t("login:invalidusernameandpassword")}`} */}
               {login.error==="reset"?null:login.error}
              </Alert>
            </Collapse>
           } 
           {/* reseting in    */}
           
           
       <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
         <TextField
           margin="normal"
           required
           fullWidth
           id="username"
           label= {t("common:username")}
           name="username"
           autoComplete="username"
           autoFocus
           error={usernameError?usernameError:""}
           helperText={usernameError?usernameError:""}
         />
         <TextField
           margin="normal"
           required
           fullWidth
           name="password"
           label= {t("common:password")}
           type="password"
           id="password"
           autoComplete="current-password"
           error={passwordError?passwordError:""}
           helperText={passwordError?passwordError:""}
         />
         {/* <FormControlLabel
           control={<Checkbox value="remember" color="primary" />}
           label={t("login:rememberme")}
         /> */}
         <Box
         sx={{display:{xs:"block",sm:"none"}}}
         >
      <LanguagePopover/>
         </Box>
           {!login.loading? 
           <Button
           type="submit"
           fullWidth
           variant="contained"
           color="warning"
           sx={{ mt: 3, mb: 2 }}
          
         > {t("login:signin")}</Button>: 
         <Box sx={{ display: 'flex',justifyContent:"center" }}>
         <CircularProgress  sx={{ color: 'orange' }} />
          </Box>
         }
         <Grid container>
           <Grid item xs>
             <Link href="/forgot-pin" variant="body2">
             {t("login:forgotpassword")}?
             </Link>
           </Grid>
           <Grid item>
             <Link href="#" variant="body2">
             {t("common:termsandconditions")} 
             </Link>
           </Grid>
         </Grid>
       </Box>
     </Box>
   {/* </Grid> */}
 </Grid>
          {/* </Paper> */}
     
    </ThemeProvider>
      </React.Fragment>
     
    )
  }
  
  export default SignIn