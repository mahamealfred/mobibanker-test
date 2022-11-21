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
import { MenuItem } from "@mui/material";
import { useTranslation } from "react-i18next";
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
const Document = ({
  formData,
  setFormData,
  open,
  setOpen,
  years,
  setYears,
  nIdErrorMessage,
  paymentYearErrorMessage,
  errorMessage,
  setErrorMessage
}) => {
    const { i18n,t } = useTranslation(["home","common","login","cbhi"]);
    const handleClose = () => {
        setErrorMessage('')
        setOpen(false);
    };
  
    return (
        <React.Fragment>
             {
            !errorMessage ? null : (
                <Collapse in={open}>
                    <Alert severity="error"
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
                        {/* {errorMessage==="Provided NID is not registered to the head of the household"?`${t("cbhi:providedNIDisnotregisteredtotheheadofthehousehold")}`:errorMessage} */}
                        {errorMessage}
                         </Alert>
                </Collapse>
            )
        }
        
            <ThemeProvider theme={theme}>
                <Typography variant="h6" color="text.primary"  align="center"
                  sx={{ fontSize:{xs:14,md:16,lg:18} }}
                >
         
                    </Typography>
            </ThemeProvider>
          
            <Grid container
                spacing={3}>
                <Grid item
                    xs={12}>
                    <TextField id="address2"  
                    name="address2" 
                    label={t("cbhi:householdernid")}
                    size="small"
                    margin="normal"
                        value={formData.nId}
                        onChange={(e) => setFormData({...formData,nId: e.target.value}) }
                        helperText={nIdErrorMessage ? nIdErrorMessage : ""}
                        error={nIdErrorMessage}
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="outlined"/>
                </Grid>
            </Grid>
            <ThemeProvider theme={theme}>
                <Typography variant="h6" color="text.primary"  align="center"
                  sx={{ fontSize:{xs:14,md:16,lg:18} }}
                >
                {/* Year */}
                </Typography>
            </ThemeProvider>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id="nID"
            name="PaymentYear"
            label={t("common:year")}
            margin="normal"
            size="small"
            select
            value={formData.paymentYear}
            onChange={(e) =>setFormData({ ...formData, paymentYear: e.target.value })}
            helperText={paymentYearErrorMessage ? paymentYearErrorMessage : ""}
            error={paymentYearErrorMessage}
            fullWidth
            autoComplete="shipping address-line2"
            variant="outlined"
            
          >
            {console.log("yerrrr",years)}
             {years.map((option) => (
                      <MenuItem key={option.year} value={option.year}>{option.year}</MenuItem>
                    ))} 
            </TextField>
        </Grid>
        
      </Grid>
        </React.Fragment>
    );
};

export default Document;
