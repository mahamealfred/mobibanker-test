import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Widget from '../../components/widget/Widget';
import TopNav from '../../components/topNav/TopNav';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Appbar from '../../components/appbar';
import { loginAction } from '../../redux/actions/loginAction';
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
const SignIn = () => {
    const history=useHistory()
    const { t } = useTranslation(["home","common","login"]);
    const dispatch=useDispatch();
    const login=useSelector((state)=>state.login)
    const [username,setUsername]=useState();
    const [password,setPassword]=useState();
    const [usernameError,setUsernameError]=useState();
    const [passwordError,setPasswordError]=useState();
    const [errMessage,setErrMessage]=useState('')
    const [open, setOpen] = React.useState(true);

      const handleSubmit = async(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
         
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
            await dispatch(loginAction({username: data.get('username'),password: data.get('password')},history));
            // console.log("authenticstion",Auth.auth)
          }
         
          if(login.error){
            setOpen(true);
          }
        };
        // useEffect(()=>{
        //   async function fechtData(){
        //     if(Auth.auth==true){
        //       console.log("authentication ...::")
        //       history.push('/dashboard',{push:true})
        //      // await dispatch(loginAction({username: data.get('username'),password: data.get('password')},history));
        //     }
        //   }
        //  fechtData();
        // },[Auth.auth])
        // useEffect(()=>{
        //   async function fecthData(){
        //     console.log("status::",auth)
        //     if(auth==true){
        //       history.push('/dashboard',{push:true}) 
        //     }
        //  if(!login.loading){
        //   if(login.users.length!==0){
        //     if(login.users.code==200){
              
        //       const userId=login.users.id
        //       const name=login.users.display
        //       const role=login.users.brokering
        //       const group=login.users.group
             
        //       const jwt_secret="tokensecret"
        //       const claims={userId,name,role,username,group,password}
        //       const token= jwt.sign(claims,jwt_secret, { expiresIn: "7d"});
        //       history.push('/dashboard',{push:true})
        //       sessionStorage.setItem('mobicash-auth',token)
        //       return localStorage.setItem('mobicashAuth',token);
        //     }
          
        //   }
        //  }
        //   }
        //   fecthData();
        // },[!login.users])
        const handleClose=()=>{
          setOpen(false)
        }
        const theme = createTheme();
    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '80vh', backgroundColor:'primary' }}>
          <Box
            sx={{
              my: 12,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
             
            }}
          >
            <Typography component="h1" variant="h5"
           
            >
             {t("login:signin")}
            </Typography>
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
                    {login.error}
                   </Alert>
                 </Collapse>
                }    
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
                  <Link href="/forgotpassword" variant="body2">
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
    </ThemeProvider>
      </React.Fragment>
     
    )
  }
  
  export default SignIn