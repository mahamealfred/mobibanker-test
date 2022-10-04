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
import { MenuItem } from "@mui/material";
const banks=[
  {
      value:"BK",
      label:"Bank of Kigali"
  },
  {
      value:"GTBank",
      label:"GT Bank"
  },
  {
      value:"Equity",
      label:"Equity"
  }
  , {
      value:"AccessBank",
      label:"Access Bank"
  }
]
const Payment=({
  formData,
  setFormData,
  payerName,
  payerNid,
  bankAccountErrorMessage,
  bankNameErrorMessage,
  payerEmailErrorMessage,
  phoneNumberError,
  amountToPayErrorMessage,
  passwordError,
  open,
  setOpen,
  paymenterrorMessage,
  setPaymenterrorMessage
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
      <Grid item xs={12} md={6}>
                 <Typography variant="body2" mt={1} textAlign="center" sx={{ fontSize: "14px", fontWeight: "bold" }} gutterBottom>
               PAYER NAME
              </Typography>
              <Typography variant="body2" textAlign="center" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
              {payerName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                 <Typography variant="body2" textAlign="center" mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }} gutterBottom>
              NID
              </Typography>
              <Typography variant="body2" textAlign="center" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
             {payerNid}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Select Bank"
            value={formData.bankName}
            select
            onChange={(e)=>setFormData({...formData,bankName:e.target.value})}
            helperText={bankNameErrorMessage? bankNameErrorMessage : ""}
            error={bankNameErrorMessage}
            fullWidth
            autoComplete="cc-name"
            variant="outlined"
          >
            {banks.map((option) => (
                      <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    ))} 
            </TextField>
        </Grid>
            <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Account Number"
            value={formData.bankAccount}
            onChange={(e)=>setFormData({...formData,bankAccount:e.target.value})}
            helperText={bankAccountErrorMessage? bankAccountErrorMessage : ""}
            error={bankAccountErrorMessage}
            fullWidth
            autoComplete="cc-name"
            variant="outlined"
          />
        </Grid>
            <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Amount to pay"
            value={formData.amountPaid}
            onChange={(e)=>setFormData({...formData,amountPaid:e.target.value})}
            helperText={amountToPayErrorMessage? amountToPayErrorMessage : ""}
            error={amountToPayErrorMessage}
            fullWidth
            autoComplete="cc-name"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
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
            id="cardName"
            label="Payer Email"
            value={formData.payerEmail}
            onChange={(e)=>setFormData({...formData,payerEmail:e.target.value})}
            helperText={payerEmailErrorMessage? payerEmailErrorMessage : ""}
            error={payerEmailErrorMessage}
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