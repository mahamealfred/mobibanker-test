import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";


const Payment=({
  
  formData,setFormData,phoneNumberError,passwordError,taxPayerName,amountToPay,rraRef, paymenterrorMessage,
  setPaymenterrorMessage,open,setOpen})=> {
  
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
      <Typography variant="h6" gutterBottom>
     Payment  method
      </Typography>
      <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
                 <Typography variant="body2" mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }} gutterBottom>
               Payer Name
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
              Mahame Alfred
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
                 <Typography variant="body2" mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }} gutterBottom>
                RRA reference
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
             113366777
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
                 <Typography variant="body2" mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }} gutterBottom>
                 Amount to pay
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
                5000  Rwf
              </Typography>
            </Grid>
  
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Payer phone number"
            value={formData.phoneNumber}
            onChange={(e)=>setFormData({...formData,phoneNumber:e.target.value})}
            helperText={phoneNumberError? phoneNumberError : ""}
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