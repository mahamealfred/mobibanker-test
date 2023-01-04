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
            <Grid item xs={12} md={8}>
                 <Typography variant="body2" textAlign="center" mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }} gutterBottom>
        Phone Number
              </Typography>
              <Typography variant="body2" textAlign="center" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
          {phone}
              </Typography>
            </Grid>
            {/* <Grid item xs={12} md={8}>
                 <Typography variant="body2" textAlign="center" mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }} gutterBottom>
          Account Number
              </Typography>
              <Typography variant="body2" textAlign="center" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
         {formData.accountNumber}
              </Typography>
            </Grid> */}
          
       
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
            variant="outlined"
          />
            
         
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            margin="normal"
            size="small" 
            select
            label="Destination"
            value={formData.destination}
            onChange={(e)=>setFormData({...formData,destination:e.target.value})}
            helperText={destinationErr? destinationErr : ""}
            error={destinationErr}
            fullWidth
            autoComplete="cc-name"
            variant="outlined"
          >
            {Destinations.map((option) => (
                      <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
                    ))} 
            </TextField>
        </Grid> */}
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
            variant="outlined"
          />
        </Grid>
        
       
      </Grid>
    </React.Fragment>
  );
}
export default  Account