import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { MenuItem } from '@mui/material';


const Payment=({
  formData,
  setFormData,
  phoneNumberError,
   passwordError,
   paymenterrorMessage,
   amountPaidError,
   houseHoldNID,
   payerName,
   houseHoldCategory,
   householdMemberNumber,
   members,
   totalPremium,
  setPaymenterrorMessage,
  open,
  setOpen
})=> {
  
    const handleClose = () => {
      setPaymenterrorMessage('')
      setOpen(false);
    };
  return (
    <React.Fragment>
      {!paymenterrorMessage ? null : (
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
            {paymenterrorMessage}
          </Alert>
        </Collapse>
      )}
      <Typography variant="h6" textAlign="center" gutterBottom>
     Payment  method
      </Typography>
      <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
              <Typography variant="body2" textAlign="center" mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }} gutterBottom>
               PAYER NAME
              </Typography>
              <Typography variant="body2" textAlign="center" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
             {payerName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
                 <Typography variant="body2" textAlign="center" mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }} gutterBottom>
                HOUSEHOLD NID
              </Typography>
              <Typography variant="body2" textAlign="center" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
               {houseHoldNID}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
                 <Typography variant="body2" textAlign="center" mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }} gutterBottom>
                TOTAL PREMIUM
              </Typography>
              <Typography variant="body2" textAlign="center" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
                {totalPremium.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} Rwf
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                 <Typography variant="body2" textAlign="center" mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }} gutterBottom>
             HOUSEHOLD CATEGORY
              </Typography>
              <Typography variant="body2" textAlign="center" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
                {houseHoldCategory}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
                 <Typography variant="body2" textAlign="center" mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }} gutterBottom>
               TOTAL MEMBERS
              </Typography>
              <Typography variant="body2" textAlign="center" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
                {householdMemberNumber}
              </Typography>
            </Grid>
            <Grid item xs={12} md={14}>
            <Typography variant="body2" textAlign="center" mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }} gutterBottom>
               MEMBERS
              </Typography>
              {
                !members?null:
                <TextField
                required
                id="cardName"
                select
                label="Check members"
                fullWidth
                autoComplete="cc-name"
          
              >
               {members.map((option) => (
                            <MenuItem disabled key={option.fullNames} value={option.fullNames}>{option.fullNames}</MenuItem>
                          ))}
                </TextField>
              }
         
        </Grid>
            <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            margin="normal"
            label="Amount to pay"
            value={formData.amountPaid}
            onChange={(e)=>setFormData({...formData,amountPaid:e.target.value})}
            helperText={amountPaidError? amountPaidError : ""}
            error={amountPaidError}
            fullWidth
            autoComplete="cc-name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            margin="normal"
            label="Payer phone number"
            value={formData.phoneNumber}
            onChange={(e)=>setFormData({...formData,phoneNumber:e.target.value})}
            helperText={phoneNumberError? phoneNumberError : "Format 078..."}
            error={phoneNumberError}
            fullWidth
            autoComplete="cc-name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            margin="normal"
            label="Agent Pin"
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
export default  Payment