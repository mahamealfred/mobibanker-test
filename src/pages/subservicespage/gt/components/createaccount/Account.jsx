import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import { Box } from '@mui/material';

const Account=({
  formData,
  setFormData,
  placeOfIssue,
  firstName,
  lastName,
  photo,
  dateOfBirth,
  gender,
  passwordError,
  setOpen,
  open,
  openAccountError,
  setOpenAccountError,
  phoneNumberError,
  emailError
 
})=> {
  const { i18n,t } = useTranslation(["home","common","rra"]);
    const handleClose = () => {
      setOpenAccountError('')
        setOpen(false);
    };
  return (
    <React.Fragment>
        {   !openAccountError ? null : (
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
                        {openAccountError}  
                        </Alert>
                </Collapse>
            )
        }
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
     
    >
        <img style={{width:120,height:100,objectFit:"contain"}} src={`data:image/png;base64,${photo}`}/>
        </Box>
      <Grid container spacing={3}
        alignItems="center"
        justifyContent="center"
      
      >
         
      <Grid item xs={12} md={4}>
                 <Typography variant="body2" textAlign="center" mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }} gutterBottom>
             Names
              </Typography>
              <Typography variant="body2" textAlign="center" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
           {lastName +" "+firstName} 
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
                 <Typography variant="body2" textAlign="center" mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }} gutterBottom>
           NID
              </Typography>
              <Typography variant="body2" textAlign="center" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
          {formData.nid}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
                 <Typography variant="body2" textAlign="center" mt={1} sx={{ fontSize: "14px", fontWeight: "bold" }} gutterBottom>
                Place of Issue
              </Typography>
              <Typography variant="body2" textAlign="center" sx={{ fontSize: "16px", fontWeight: "bold" }} color="text.secondary">
           {placeOfIssue}
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
          <TextField
            required
            id="cardName"
            margin="normal"
            size="small" 
            label="Email"
            value={formData.email}
            onChange={(e)=>setFormData({...formData,email:e.target.value})}
            helperText={emailError? emailError : ""}
            error={emailError}
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
            label="Phone number"
            value={formData.phoneNumber}
            onChange={(e)=>setFormData({...formData,phoneNumber:e.target.value})}
           helperText={phoneNumberError? phoneNumberError : ""}
           error={phoneNumberError}
            fullWidth
            autoComplete="cc-name"
            variant="filled"
          />
        </Grid>
      
        {/* <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            margin="normal"
            size="small" 
            label="Book amount"
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
export default  Account