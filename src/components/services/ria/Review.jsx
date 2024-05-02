import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import moment from 'moment';
import {useTranslation} from "react-i18next"
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
export default function Review({
  clientEmail,
  clientPhoneNumber,
  clientName,
  depositErrorMessage,
  setDepositErrorMessage,
      openPayment,
      setOpenPayment,
}) {
  const handleClose = () => {
   setDepositErrorMessage("")
    setOpenPayment(false);
  };
  return (
    <React.Fragment>
       <Typography variant="h6" textAlign="center" gutterBottom>
          CLIENT PROFILE
      </Typography>
      {!depositErrorMessage ? null : (
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
            {depositErrorMessage}
          </Alert>
        </Collapse>
      )}
      <List disablePadding>
          <ListItem  sx={{ py: 1, px: 0 ,textAlign:"center"}} >
            <ListItemText primary="Full Name"  secondary={clientName} />
          </ListItem>
          <ListItem  sx={{ py: 1, px: 0 ,textAlign:"center"}} >
            <ListItemText primary="Phone Number"secondary={clientPhoneNumber} />
          </ListItem>
        
            <ListItem  sx={{ py: 1, px: 0 ,textAlign:"center"}} >
            <ListItemText primary="Email Address"  secondary={clientEmail} />
          </ListItem>

      </List>
     
    </React.Fragment>
  );
}