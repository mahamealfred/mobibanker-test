import  React,{lazy} from 'react';
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
//import TopNav from '../../components/topNav/TopNav';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Appbar from '../../components/appbar';
import { loginAction } from '../../redux/actions/loginAction';
import { forgotPasswordAction } from '../../redux/actions/forgotPasswordAction';
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
import TopNav from "../../components/topNav/TopNav";
// const TopNav =lazy(()=>import("../../components/topNav/TopNav"));
const Forgotpassword= () => {
    const history=useHistory()
    const { t } = useTranslation(["home","common","login"]);
    const dispatch=useDispatch();
    const login=useSelector((state)=>state.login)
    const forgotPassword=useSelector((state)=>state.forgotPassword)
    const [username,setUsername]=useState();
    const [password,setPassword]=useState();
    const [usernameError,setUsernameError]=useState();
    const [passwordError,setPasswordError]=useState();
    const [errMessage,setErrMessage]=useState('')
    const [open, setOpen] = React.useState(true);

      const handleSubmit = async(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          if(data.get('username')=="" ){
            setUsernameError(`${t("login:usernameisrequired")}`)
            
          }
         
          else{
            setUsernameError("")
            await dispatch(forgotPasswordAction({username: data.get('username')},history));
            // console.log("authenticstion",Auth.auth)
           
          }
         
          if(forgotPassword.error){
            setOpen(true);
          }
        };
     
        const handleClose=()=>{
          setOpen(false)
        }
        const theme = createTheme();
       
    return (
      <React.Fragment>
        <TopNav/>
        <ThemeProvider theme={theme}>
      {/* <Grid container  sx={{ height: '100vh', backgroundColor:'primary' }}> */}
      <Grid
  container
  direction="column"
  alignItems="center"
  justifyContent="center"
  sx={{ height: '50vh', backgroundColor:'primary' }}

>
  <Grid item xs={3}>
  <Typography component="h1" textAlign="center" variant="h5" color="gray"
           
           >
         Forgot PIN
           </Typography>
           {
                 !forgotPassword.error? null:
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
                   {forgotPassword.error==="FAILURE"?"You'are temporarily blocked":forgotPassword.error}
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

               {!forgotPassword.loading? 
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
             <Grid container>
               <Grid item xs>
                 <Link href="#" variant="body2">
              
                 </Link>
               </Grid>
               <Grid item>
                 <Link href="#" variant="body2">
                
                 </Link>
               </Grid>
             </Grid>
           </Box>
  </Grid>   
   
</Grid> 
        {/* </Grid> */}
      {/* </Grid> */}
    </ThemeProvider>
      </React.Fragment>
     
    )
  }
  
  export default Forgotpassword