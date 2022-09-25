import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import moment from 'moment';
export default function Review({
  payerName,
  formData,
  transactionId,
  transactionStatus,
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
            <ListItemText primary="PAYER NAME"/>
            <Typography variant="body2">{payerName}</Typography>
          </ListItem>
        

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="PAID AMOUNT" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {formData.amountPaid.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} Rwf
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" textAlign="letf" gutterBottom sx={{ mt: 2 }}>
       AGENT NAME
          </Typography>
          <Typography gutterBottom textAlign="left">{agentName}</Typography>
        </Grid>
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
                  <Typography gutterBottom textAlign="center">{transactionId}</Typography>
                </Grid>
              </React.Fragment>
              <React.Fragment >
                <Grid item xs={6}>
                  <Typography gutterBottom textAlign="left">Description</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom textAlign="center">RSSB Mutuelli</Typography>
                </Grid>
              </React.Fragment>
              <React.Fragment >
                <Grid item xs={6}>
                  <Typography gutterBottom textAlign="left">Date</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom textAlign="center">{moment(dateTime).format("llll")}</Typography>
                </Grid>
              </React.Fragment>
              <React.Fragment >
                <Grid item xs={6}>
                  <Typography gutterBottom textAlign="left">Status</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom textAlign="center">{transactionStatus}</Typography>
                </Grid>
              </React.Fragment>
        
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}