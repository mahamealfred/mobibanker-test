import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";

const Payment=({
  formData,
  setFormData,
  phoneNumberError,
  passwordError,
  payerName,
  paymenterrorMessage,
  setPaymenterrorMessage,
  taxIdentificationNumberError,
  amountTopayError,
  openPayment,
  setOpenPayment,

})=> {
  const { t } = useTranslation(["home","common","electricity"]);
    const handleClose = () => {
      setPaymenterrorMessage('')
      setOpenPayment(false);
    };
  return (
    <React.Fragment>
      {!paymenterrorMessage ? null : (
        <Collapse in={openPayment}>
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
       
      <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
                 <Typography variant="body2" mt={1} textAlign="center" sx={{ fontSize: "14px", fontWeight: "bold" }} gutterBottom>
                 {t("common:payername")}
              </Typography>
              <Typography variant="body2" textAlign="center" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
              {payerName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                 <Typography variant="body2" textAlign="center" mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }} gutterBottom>
                 {t("electricity:meternumber")}
              </Typography>
              <Typography variant="body2" textAlign="center" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
              {formData.meterNumber}
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            margin="normal"
            size="small"
            label={t("common:amounttopay")}
            value={formData.amountToPay}
            onChange={(e)=>setFormData({...formData,amountToPay:e.target.value})}
            helperText={amountTopayError? amountTopayError : ""}
            error={amountTopayError}
            fullWidth
            autoComplete="cc-name"
            variant="filled"
          />

      </Grid>
      <Grid item xs={12} md={6}>
          <TextField
        
            id="cardName"
            margin="normal"
            size="small"
            label={t("common:tin")}
            value={formData.taxIdentificationNumber}
            onChange={(e)=>setFormData({...formData,taxIdentificationNumber:e.target.value})}
            // helperText={taxIdentificationNumberError? taxIdentificationNumberError : ""}
             helperText={t("common:optional")}
            // error={taxIdentificationNumberError}
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
            label={t("common:payerphone")}
            value={formData.phoneNumber}
            onChange={(e)=>setFormData({...formData,phoneNumber:e.target.value})}
            helperText={phoneNumberError? phoneNumberError : ""}
            error={phoneNumberError}
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
            label={t("common:agentpin")}
            size="small"
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
export default  Payment