import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import moment from 'moment';

export default function Review({
  dateTime,
  transactionId,
  transactionStatus,
  payerName,
  amountPaid,
  agentName,
  tokenValue
}) {
  
  return (
    <React.Fragment>
      <Typography variant="h6" textAlign="center" gutterBottom>
       TRANSACTION DETAILS
      </Typography>
      <List disablePadding>
          <ListItem  sx={{ py: 1, px: 0 }}>
            <ListItemText primary="PAYER NAME"/>
            {/* <Typography variant="body2">{payerName}</Typography> */}
            <Typography variant="body2">Mahame Alfred</Typography>
          </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="PAID AMOUNT" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
             {/* let nf = new Intl.NumberFormat('en-US');
                    nf.format(number); // "1,234,567,890" */}
              {/* {amountPaid.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}  Rwf */}
          400 rwf
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" textAlign="left" gutterBottom sx={{ mt: 2 }}>
         AGENT NAME
          </Typography>
          {/* <Typography textAlign="left" gutterBottom>{agentName}</Typography> */}
          <Typography textAlign="left" gutterBottom>Jeanc 2</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" textAlign="center" gutterBottom sx={{ mt: 2 }}>
        Payment Details
          </Typography>
          <Grid container>
           
              <React.Fragment >
                <Grid item xs={6}>
                  <Typography textAlign="left" gutterBottom>Mobicash reference</Typography>
                </Grid>
                <Grid item xs={6}>
                  {/* <Typography  textAlign="center" gutterBottom>{transactionId}</Typography> */}
                  <Typography  textAlign="center" gutterBottom>M2332</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography textAlign="left" gutterBottom>Token</Typography>
                </Grid>
                <Grid item xs={6}>
                  {/* <Typography  textAlign="center" gutterBottom>{tokenValue}</Typography> */}
                  <Typography  textAlign="center" gutterBottom>34443223</Typography>
                </Grid>
              </React.Fragment>
              <React.Fragment >
                <Grid item xs={6}>
                  <Typography textAlign="left" gutterBottom>Description</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography textAlign="center" gutterBottom>Electricity tax</Typography>
                </Grid>
              </React.Fragment>
              <React.Fragment >
                <Grid item xs={6}>
                  <Typography textAlign="left" gutterBottom>Date</Typography>
                </Grid>
                <Grid item xs={6}>
                  {/* <Typography textAlign="center" gutterBottom>{moment(dateTime).format("llll")}</Typography> */}
                  <Typography textAlign="center" gutterBottom>12/13/1222</Typography>
                </Grid>
              </React.Fragment>
              <React.Fragment >
                <Grid item xs={6}>
                  <Typography textAlign="left" gutterBottom>Status</Typography>
                </Grid>
                <Grid item xs={6}>
                  {/* <Typography textAlign="center" gutterBottom>{transactionStatus}</Typography> */}
                  <Typography textAlign="center" gutterBottom>Success</Typography>
                </Grid>
              </React.Fragment>
        
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}