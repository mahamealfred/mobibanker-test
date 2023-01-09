import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import { Box, MenuItem } from '@mui/material';
const Destinations=[
  {
    id:"INT",
    name:"Internal"
  },
  {
    id:"EXT",
    name:"External"
  }
]
const Account=({
  formData,
  setFormData,
  amountErr,
  debit,
  phone,
  passwordError,
  // destinationErr,
  depositerrorMessage,
  accountName,
  setDepositerrorMessage,
  depositorNameError,
  remarksError,
  depositorPhoneError,
  open,
  setOpen
})=> {
  const { i18n,t } = useTranslation(["home","common","rra"]);
    const handleClose = () => {
      setDepositerrorMessage('')
      setOpen(false);
    };
    
  return (
    <React.Fragment>
         {!depositerrorMessage ? null : (
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
            {depositerrorMessage}
          </Alert>
        </Collapse>
      )}
   
      <Grid container spacing={3}
          alignItems="center"
          justifyContent="center"
      >
       
      <Grid item xs={12} md={8}>
                 <Typography variant="body2" textAlign="center" mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }} gutterBottom>
         Account Name
              </Typography>
              <Typography variant="body2" textAlign="center" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
          {accountName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
                 <Typography variant="body2" textAlign="center" mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }} gutterBottom>
         Account Number
              </Typography>
              <Typography variant="body2" textAlign="center" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
          {debit}
              </Typography>
            </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            margin="normal"
            size="small" 
            label="Amount"
            value={formData.amount}
            onChange={(e)=>setFormData({...formData,amount:e.target.value})}
            helperText={amountErr? amountErr : ""}
            error={amountErr}
            fullWidth
            autoComplete="cc-name"
            variant="filled"
          />
        </Grid>
           <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            margin="normal"
            size="small" 
            label="Depositor name"
            value={formData.depositorName}
            onChange={(e)=>setFormData({...formData,depositorName:e.target.value})}
            helperText={depositorNameError? depositorNameError : ""}
            error={depositorNameError}
            fullWidth
            autoComplete="cc-name"
            variant="filled"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            margin="normal"
            size="small" 
            label="Depositor phone"
            value={formData.depositorPhone}
            onChange={(e)=>setFormData({...formData,depositorPhone:e.target.value})}
            helperText={depositorPhoneError? depositorPhoneError : ""}
            error={depositorPhoneError}
            fullWidth
            autoComplete="cc-name"
            variant="filled"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            margin="normal"
            size="small" 
            label="Remarks"
            value={formData.remarks}
            onChange={(e)=>setFormData({...formData,remarks:e.target.value})}
            helperText={remarksError? remarksError : ""}
            error={remarksError}
            fullWidth
            autoComplete="cc-name"
            variant="filled"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            margin="normal"
            size="small" 
            label={t("common:agentpin")}
            value={formData.password}
            onChange={(e)=>setFormData({...formData,password:e.target.value})}
            helperText={passwordError? passwordError : ""}
            error={passwordError}
            type="password"
            fullWidth
            autoComplete="cc-number"
            variant="filled"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
export default  Account