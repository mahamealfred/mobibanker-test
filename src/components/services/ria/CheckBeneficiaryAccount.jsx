import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {useState} from "react";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { MenuItem } from "@mui/material";
const theme = createTheme();
theme.typography.h3 = {
    fontSize: '0.9rem',
    '@media (min-width:600px)': {
        fontSize: '0.9rem'
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '1rem'
    }
};
const identifications=[
    {
        name:"NID",
        value:"NID"
    },
    {
        name:"Passport",
        value:"Passport"
    }
]
const CheckBeneficiaryAccount = ({
    formData,
    setFormData,
    identityNumberErr,
            identityTypeErr,
            currentEmailErr,
            paymenterrorMessage,
            setPaymenterrorMessage,
            openPayment,
            setOpenPayment,
}) => {
    const { t } = useTranslation(["home","common","electricity"]);
    const handleClose = () => {
        setPaymenterrorMessage('')
        setOpenPayment(false);
      };
  
    return (
        <React.Fragment>  {!paymenterrorMessage ? null : (
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
            <ThemeProvider theme={theme}>
            </ThemeProvider>
            <Grid container
                spacing={3}>
                <Grid item
                    xs={12}>
                         <TextField
            id="nID"
            name="PaymentYear"
            required
            label="Select Identity Type"
            margin="normal"
            size="small"
            select
            value={ formData.identityType}
            onChange={(e) => setFormData({...formData,identityType: e.target.value})}
            helperText={identityTypeErr ? identityTypeErr : ""}
            error={identityTypeErr}
            fullWidth
            autoComplete="shipping address-line2"
            variant="filled"
          >
             {identifications.map((option) => (
                      <MenuItem key={option.value} value={option.value}>{option.name}</MenuItem>
                    ))} 
            </TextField>
                 
                </Grid>
                <Grid item
                    xs={12}>
                    <TextField id="address2"  size="small"  margin="normal" name="address2" label="Enter Identity Number"
                        required
                        value={ formData.identityNumber}
                        onChange={(e) => setFormData({...formData,identityNumber: e.target.value})}
                        helperText={   identityNumberErr?   identityNumberErr: ""}
                        error={identityNumberErr}
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="filled"
                        />
                </Grid>
                <Grid item
                    xs={12}>
                    <TextField id="address2"  size="small"  margin="normal" name="address2" label="Enter Your Current Email"
                        required
                        value={ formData.currentEmail}
                        onChange={(e) => setFormData({...formData, currentEmail: e.target.value})}
                        helperText={ currentEmailErr ? currentEmailErr : ""}
                        error={currentEmailErr}
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="filled"
                        />
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default CheckBeneficiaryAccount;
