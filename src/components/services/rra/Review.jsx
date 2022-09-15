import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

export default function Review() {
  
  return (
    <React.Fragment>
      <Typography variant="h6" textAlign="center" gutterBottom>
       TRANSACTION DETAILS
      </Typography>
      <List disablePadding>
          <ListItem  sx={{ py: 1, px: 0 }}>
            <ListItemText primary="PAYER NAME"/>
            <Typography variant="body2">Mahame Alfred</Typography>
          </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="PAID AMOUNT" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          5000 Rwf
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" textAlign="left" gutterBottom sx={{ mt: 2 }}>
         AGENT NAME
          </Typography>
          <Typography textAlign="left" gutterBottom>Nsabimana Jean </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" textAlign="center" gutterBottom sx={{ mt: 2 }}>
        Payment Details
          </Typography>
          <Grid container>
           
              <React.Fragment >
                <Grid item xs={6}>
                  <Typography textAlign="left" gutterBottom>TransactionID </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography  textAlign="center" gutterBottom>M2998</Typography>
                </Grid>
              </React.Fragment>
              <React.Fragment >
                <Grid item xs={6}>
                  <Typography textAlign="left" gutterBottom>Description</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography textAlign="center" gutterBottom>RRA tax</Typography>
                </Grid>
              </React.Fragment>
              <React.Fragment >
                <Grid item xs={6}>
                  <Typography textAlign="left" gutterBottom>Date</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography textAlign="center" gutterBottom>11/09/2022</Typography>
                </Grid>
              </React.Fragment>
              <React.Fragment >
                <Grid item xs={6}>
                  <Typography textAlign="left" gutterBottom>Status</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography textAlign="center" gutterBottom>success</Typography>
                </Grid>
              </React.Fragment>
        
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}