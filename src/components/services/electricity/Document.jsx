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
    meterNumberErr,
    errorMessage,
    setErrorMessage,
    open,
    setOpen
}) => {
    const { t } = useTranslation(["home","common","electricity"]);
    const handleClose = () => {
        setErrorMessage('')
        setOpen(false);
    };
  
    return (
        <React.Fragment> {
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
                        {/* {errorMessage==="System unit not active. (6013) - 8/2214"?`${t("electricity:invalidmeternumber")}`:errorMessage}  */}
                        {errorMessage} 
                        </Alert>
                </Collapse>
            )
        }
            <ThemeProvider theme={theme}>
                {/* <Typography variant="h6" color="text.primary"  align="center"
            sx={{ fontSize:{xs:14,md:16,lg:18} }}
                >
               
                    </Typography> */}
            </ThemeProvider>
            <Grid container
                spacing={3}>
                <Grid item
                    xs={12}>
                    <TextField id="address2"  size="small"  margin="normal" name="address2" label={t("electricity:meternumber")}
                        required
                        value={ formData.meterNumber}
                        onChange={(e) => setFormData({...formData,meterNumber: e.target.value})}
                        helperText={meterNumberErr ? meterNumberErr : ""}
                        error={meterNumberErr}
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="filled"
                        />
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default Document;
