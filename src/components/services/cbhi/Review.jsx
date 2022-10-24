import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import moment from 'moment';
import { useTranslation } from "react-i18next";
export default function Review({
  payerName,
  formData,
  transactionId,
  transactionStatus,
  houseHoldCategory,
  householdMemberNumber,
  dateTime,
  agentName,
}) {
  
  return (
    <React.Fragment>
      <Typography variant="h6" textAlign="center" gutterBottom>
      TRANSACTION DETAILS
      </Typography>
      <List disablePadding>
    
          <ListItem  sx={{ py: 1, px: 0 }}>
            <ListItemText primary="HOUSEHOLDER NAME"/>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{payerName}</Typography>
          </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="PAID AMOUNT" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {formData.amountPaid.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} Rwf
          </Typography>
        </ListItem>
        <ListItem  sx={{ py: 1, px: 0 }}>
            <ListItemText primary="HOUSEHOLDER NID"/>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{formData.nId}</Typography>
          </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="HOUSEHOLDER CATEGORY" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
           {houseHoldCategory}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="NUMBER OF MEMBERS" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
           { householdMemberNumber}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="YEAR OF PAYMENT" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
           {formData.paymentYear}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
     
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" textAlign="center" gutterBottom sx={{ mt: 2 }}>
        Payment Details
          </Typography>
          <Grid container>
           
              <React.Fragment >
                <Grid item xs={6}>
                  <Typography gutterBottom textAlign="left">TransactionID </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom textAlign="right">{transactionId}</Typography>
                </Grid>
              </React.Fragment>
              <React.Fragment >
                <Grid item xs={6}>
                  <Typography gutterBottom textAlign="left">Description</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom textAlign="right">RSSB Mutuelli</Typography>
                </Grid>
              </React.Fragment>
              <React.Fragment >
                <Grid item xs={6}>
                  <Typography gutterBottom textAlign="left">Date</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom textAlign="right">{moment(dateTime).format("llll")}</Typography>
                </Grid>
              </React.Fragment>
              <React.Fragment >
                <Grid item xs={6}>
                  <Typography gutterBottom textAlign="left">Status</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom textAlign="right">{transactionStatus}</Typography>
                </Grid>
              </React.Fragment>
        
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}