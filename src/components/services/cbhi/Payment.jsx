import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { MenuItem } from '@mui/material';
import { useTranslation } from "react-i18next";

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
   amountPaidBefore,
   paymentErrorMessage,
         setPaymentErrorMessage,
  openPayment,
  setOpenPayment
})=> {
  const { i18n,t } = useTranslation(["home","common","login","cbhi"]);
    const handleClose = () => {
      setPaymentErrorMessage('')
      setOpenPayment(false);
    };
  return (
    <React.Fragment>
      {!paymentErrorMessage ? null : (
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
            {paymentErrorMessage}
          </Alert>
        </Collapse>
      )}
   
      <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
              <Typography variant="body2" textAlign="center" mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }} gutterBottom>
               {t("common:payername")}
              </Typography>
              <Typography variant="body2" textAlign="center" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
             {payerName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
                 <Typography variant="body2" textAlign="center" mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }} gutterBottom>
                 {t("cbhi:householdernid")}
              </Typography>
              <Typography variant="body2" textAlign="center" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
               {houseHoldNID}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
                 <Typography variant="body2" textAlign="center" mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }} gutterBottom>
                 {t("cbhi:totalpremium")}
              </Typography>
              <Typography variant="body2" textAlign="center" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
                {totalPremium.toLocaleString()} Rwf
       
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                 <Typography variant="body2" textAlign="center" mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }} gutterBottom>
                 {t("cbhi:householdcategory")}
              </Typography>
              <Typography variant="body2" textAlign="center" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
                {houseHoldCategory}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
                 <Typography variant="body2" textAlign="center" mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }} gutterBottom>
                 {t("cbhi:numberofmembers")}
              </Typography>
              <Typography variant="body2" textAlign="center" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
                {householdMemberNumber}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
                 <Typography variant="body2" textAlign="center" mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }} gutterBottom>
                 {t("cbhi:alreadypay")}
              </Typography>
              <Typography variant="body2" textAlign="center" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
                {amountPaidBefore.toLocaleString()} Rwf
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                 <Typography variant="body2" textAlign="center" mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }} gutterBottom>
                 {t("common:year")}
              </Typography>
              <Typography variant="body2" textAlign="center" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
                {formData.paymentYear}
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={14}>
            <Typography variant="body2" textAlign="center" mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }} gutterBottom>
            {t("cbhi:members")}
              </Typography>
              {
                !members?null:
                <TextField
                required
                id="cardName"
                select
                label= {t("cbhi:checkmembers")}
                fullWidth
                autoComplete="cc-name"
                size="small"
          
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
            label={t("common:amounttopay")}
            size="small"
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
            label={t("common:payerphone")}
            size="small"
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
            variant="outlined"
          />
        </Grid>
       
      </Grid>
    </React.Fragment>
  );
}
export default  Payment