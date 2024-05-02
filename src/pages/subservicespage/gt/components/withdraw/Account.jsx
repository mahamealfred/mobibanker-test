import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";

const Account=({

})=> {
  const { i18n,t } = useTranslation(["home","common","rra"]);
    const handleClose = () => {
      
    };
  return (
    <React.Fragment>
    
      <Grid container spacing={3}
          alignItems="center"
          justifyContent="center"
      >
      <Grid item xs={12} md={4}>
                 <Typography variant="body2" textAlign="center" mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }} gutterBottom>
         Account Name
              </Typography>
              <Typography variant="body2" textAlign="center" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
            Mahame Alfred
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
                 <Typography variant="body2" textAlign="center" mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }} gutterBottom>
          Account Number
              </Typography>
              <Typography variant="body2" textAlign="center" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
           12627721991
              </Typography>
            </Grid>
          
       
        {/* <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            margin="normal"
            size="small" 
            label="Amount"
            // value={formData.phoneNumber}
            // onChange={(e)=>setFormData({...formData,phoneNumber:e.target.value})}
            // helperText={phoneNumberError? phoneNumberError : ""}
            // error={phoneNumberError}
            fullWidth
            autoComplete="cc-name"
            variant="outlined"
          />
        </Grid> */}
       
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            margin="normal"
            size="small" 
            label={t("common:agentpin")}
            // value={formData.password}
            // onChange={(e)=>setFormData({...formData,password:e.target.value})}
            // helperText={passwordError? passwordError : ""}
            // error={passwordError}
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