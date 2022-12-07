import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
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
    
}) => {
    const { i18n,t } = useTranslation(["home","common","rra"]);
    const handleClose = () => {
      
    };
  
    return (
        <React.Fragment> 
            <ThemeProvider theme={theme}>
                <Typography variant="h6" color="text.primary"  align="center"
                sx={{ fontSize:{xs:14,md:16,lg:18} }}
                >
                  {/* {t("rra:referencenumber")} */}
                    </Typography>
            </ThemeProvider>
            <Grid container
                spacing={3}>
                <Grid item
                    xs={12}>
                    <TextField id="address2" size="small"   margin="normal" name="address2" label="Code"
                        // value={ formData.docId}
                        // onChange={(e) => setFormData({...formData,docId: e.target.value})}
                        // helperText={docIdErr ? docIdErr : ""}
                        // error={docIdErr}
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="outlined"/>
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

export default Document;
