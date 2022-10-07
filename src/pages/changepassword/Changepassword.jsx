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
// import { login, register } from '../../actions/user';
// import { useValue } from '../../context/ContextProvider';
// import GoogleOneTapLogin from './GoogleOneTapLogin';
 import PasswordField from './PasswordField';
const Changepassword = () => {
    const [title, setTitle] = useState('Login');
  const [isRegister, setIsRegister] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const handleClose = () => {
    //     dispatch({ type: 'CLOSE_LOGIN' });
    //   };
  }
      const handleSubmit = (e) => {
        e.preventDefault();
      
        const name = nameRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;
        if (password !== confirmPassword){
 console.log("password...:")
        }
      };
    
  return (
   <React.Fragment>
     <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>
            Please fill your information in the fields below:
          </DialogContentText>
    
            <TextField
              autoFocus
              margin="normal"
              variant="standard"
              id="name"
              label="Old Password"
              type="text"
              fullWidth
              inputRef={nameRef}
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