import { Alert, Box, Button, CircularProgress, Collapse, DialogTitle, FormControl, FormHelperText, Grid, Input, InputLabel, TextField, Typography } from '@mui/material'
import React from 'react'
import { IconButton} from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import { topUpMobileMoneyAction } from '../../../redux/actions/topUpMobileMoneyReducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
const Index = () => {

  const dispatch=useDispatch();
  const topUpMobileMoney=useSelector((state)=>state.topUpMobileMoney)
 const [phone,setPhone]=useState("")
 const [amount,setAmount]=useState("");
 const [amountError,setAmountError]=useState("")
 const [phoneError,setPhoneError]=useState("")
 const [errorMessage,setErrorMessage]=useState("")
const [openErrorMessage,setOpenErrorMessage]=useState(false)
const [open,setOpen]=useState(false)


const [successMessage,setSuccessMessage]=useState("")
const handleClose=()=>{
setOpen(false)
}
const handleCloseErrorMessage=()=>{
  setOpenErrorMessage(false)
}
  const handleSubmit=async()=>{
   if(phone === ""){
    setPhoneError("Phone mumber is required")
    }
    else if(amount === ""){
      setAmountError("Amount is required")
    }else{
setPhoneError("")
setAmountError("")
await dispatch(topUpMobileMoneyAction({phone,amount}))
    }
   }


   useEffect(()=>{
    async function fetchData(){
     if (!topUpMobileMoney.loading) {
       if (topUpMobileMoney.details.length !== 0) {
         if (topUpMobileMoney.details[0].retcode === 102) {
         setSuccessMessage("Youh have Successful TopUp You Money")
         setOpen(true)
         } else {
           return null;
         }
       }
       if (topUpMobileMoney.error) {
         setErrorMessage(topUpMobileMoney.error);
        setOpenErrorMessage(true)
       }
     }
    
    }
    fetchData();
     },[topUpMobileMoney.details,topUpMobileMoney.error])
  
  return (
    <Box m="10px"
    >
          <Grid container spacing={2}
    justifyContent="center"
    width="340"
    >
  <Grid container spacing={2}
    justifyContent="center"
    sx={{width:340}}
    >
    
  <Typography id="transition-modal-title" textAlign="center" variant="h6" component="h2">
  Top Up Mobile Money
          </Typography>
       
{   !errorMessage ? null : (
                <Collapse in={openErrorMessage}>
                    <Alert severity="error"
                        action={
                            <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"onClick={handleCloseErrorMessage}>
                        <CloseIcon
                        fontSize="inherit"/></IconButton>
                        }
                        sx={
                            {mb: 0.2}
                    }>
                        {errorMessage}  
                        </Alert>
                </Collapse>
            )
        }
        {   !successMessage ? null : (
                <Collapse in={open}>
                    <Alert severity="success"
                        action={
                            <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"onClick={handleClose}>
                        <CloseIcon
                        fontSize="inherit"/></IconButton>
                        }
                        sx={
                            {mb: 0.2}
                    }>
                        {successMessage}  
                        </Alert>
                </Collapse>
            )
        }
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          <TextField
      margin="normal"
      variant="standard"
      id="1i"
      label="Enter Phone Number"
      type="text"
      fullWidth
      required
      value={phone}
      onChange={(e)=>setPhone(e.target.value)}
      helperText={phoneError? phoneError : ""}
      error={phoneError}
      // inputProps={{ minLength: 6 }}
    />
         <TextField
      margin="normal"
      variant="standard"
      id="1i"
      label="Enter Amount"
      type="text"
      fullWidth
      required
      value={amount}
      onChange={(e)=>setAmount(e.target.value)}
      helperText={amountError? amountError : ""}
      error={amountError}
      // inputProps={{ minLength: 6 }}
    />
{!topUpMobileMoney.loading? 
           <Button
           type="submit"
           fullWidth
           variant="contained"
           color="warning"
           sx={{ mt: 3, mb: 2 }}
           onClick={handleSubmit} 
         > Submit</Button>: 
          <Box sx={{ display: 'flex',justifyContent:"center" }}>
         <CircularProgress  sx={{ color: 'orange' }} />
          </Box> 
          } 
          </DialogContentText>
        </DialogContent>

       </Grid>
      </Grid>
    
   </Box>
  )
}

export default Index