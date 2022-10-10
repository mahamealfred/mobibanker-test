import React from 'react'
import { Close, Send } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
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
const Changepassword = () => {
    const [title, setTitle] = useState('Login');
    const history=useHistory()
  const [isRegister, setIsRegister] = useState(false);
  const [errorMessage,setErrMessage]=useState("");
  const [open, setOpen] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const oldPasswordRef=useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const dispatch=useDispatch();
  const changePassword=useSelector((state)=>state.changePassword)

  const handleClose = () => {
    changePassword.error=['']
setOpen(false)
setOpenError(false)
  }
      const handleSubmit = async(e) => {
        e.preventDefault();
        const oldPassword = oldPasswordRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        if (password !== confirmPassword){
          setErrMessage("Password dont not macth")
        }else{
          setErrMessage("")
         
          await dispatch(changePasswordAction({oldPassword,password,confirmPassword},history))
        }
        if(errorMessage){
        setOpen(true)
        }
        if(changePassword.error){
          setOpenError(true)
                  }
      };
//       useEffect(()=>{
//    function fecthData(){
// if(changePassword.error==''){
//   setOpenError(false)
// }
// if(errorMessage==''){
//   setOpen(false)
// }
//    }
//    fecthData()
//       },[changePassword.error])
    
  return (
   <React.Fragment>
     <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>
            Please fill your information in the fields below:
          </DialogContentText>
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
                   </Alert>
                 </Collapse>
                }    
                 {
                  !errorMessage? null:
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
                    {errorMessage}
                   </Alert>
                 </Collapse>
                }    
            <TextField
              autoFocus
              margin="normal"
              variant="standard"
              id="name"
              label="Old Password"
              type="text"
              fullWidth
              inputRef={oldPasswordRef}
              inputProps={{ minLength: 2 }}
              required
            />
       
          <PasswordField {...{ passwordRef }} />
         
            <PasswordField
              passwordRef={confirmPasswordRef}
              id="confirmPassword"
              label="Confirm Password"
            
            />
         
        </DialogContent>
        <DialogActions sx={{ px: '19px' }}>
          <Button type="submit" variant="text"  sx={{color:"#F9842C"}}  endIcon={<Send sx={{color:"#F9842C"}}/>}>
            Submit
          </Button>
        </DialogActions>
      </form>
   </React.Fragment>
  )
}

export default Changepassword