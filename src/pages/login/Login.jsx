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
const TIMEOUT_SECONDS = 15;
const SignIn = () => {
    const history=useHistory()
    const { t } = useTranslation(["home","common","login"]);
    const dispatch=useDispatch();
    const login=useSelector((state)=>state.login)
    const [usernameError,setUsernameError]=useState();
    const [passwordError,setPasswordError]=useState();
    const [open, setOpen] = React.useState(true);
    const [remainingSeconds, setRemainingSeconds] = useState(TIMEOUT_SECONDS);
    const [pending, setPending] = useState(false);
    const [password,setPassword]=useState('')
    const [error, setError] = useState(null);
    //authentication
    const { setAuth,auth } = useContext(AuthContext);
    useEffect(() => {
      async function fetchData() {
        if (!login.loading) {
          if (login.users.length !== 0) {
            if (login.users.responseCode === 100) {
           setAuth({
            username:login.users.data.username,
            password:password,
            brokering:login.users.data.brokering,
            group:login.users.data.group
          })
            } 
          }
        }
      }
      fetchData();
    }, [login.users]);
  
    useInterval(
      () => {
        if (remainingSeconds === 0) {
          setError("Request has timed out");
          login.loading=false
        } else {
          setError(null);
          setRemainingSeconds(remainingSeconds - 1);
        }
      },
    login.loading ? 1000 : null // VERY IMPORTANT, must be 1000 or NULL
    );


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
            setPassword(data.get('password'))
           login.loading=true
            setError(null);
            setRemainingSeconds(TIMEOUT_SECONDS);
            await dispatch(loginAction({username: data.get('username'),password: data.get('password')},history));
            // console.log("authenticstion",Auth.auth)
          }
         
          if(login.error){
            setOpen(true);
          }
          if(error){
            setOpen(true);
          }
        };
       
        const handleClose=()=>{
          setOpen(false)
        }
        const theme = createTheme();
    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>
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
                    {/* {login.error==="Password is temporarily blocked"?`${t("login:blockedmessage")}`:`${t("login:invalidusernameandpassword")}`} */}
                    {login.error}
                   </Alert>
                 </Collapse>
                }    
                  {
                  !error? null:
                   <Collapse in={open}>
                   <Alert
                   severity="warning"
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
                    {error}
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
    </ThemeProvider>
      </React.Fragment>
     
    )
  }
  
  export default SignIn