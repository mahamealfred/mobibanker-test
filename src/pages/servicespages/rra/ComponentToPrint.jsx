import React, { useRef } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import moment from 'moment';
import { Paper } from '@mui/material';

export const ComponentToPrint = React.forwardRef((props, ref) => {
           
    return (
      <div ref={ref}>
         <CssBaseline />
         <Container component="main" >
         <Grid 
            >
            <Box
            alignContent="center"
           xs={{padding:10}}
           >
            <Grid item xs={6}>
            <img
                  src="../../../Assets/images/logo.png"
                  alt="logo"
                  height={100}
                  width={170}
                />
            </Grid>
            <Grid item xs={8}>
                  <Typography textAlign="left"  gutterBottom>MOBICASH RWANDA</Typography>
                  <Typography textAlign="left" gutterBottom>EMAIL: info@mcash.rw</Typography>
                  <Typography textAlign="left" gutterBottom>PHONE: (+250) 787 797 979</Typography>
                  <Typography textAlign="left" gutterBottom>WEBSITE: www.mcash.rw </Typography>
                </Grid>
           </Box>
            </Grid>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
         <Grid
           container
           direction="column"
           alignItems="center"
           justifyContent="center"
           >
        <Typography variant="h6" textAlign="center" gutterBottom>
       PAYEMENT DETAILS
      </Typography>
      <Grid container>
              <React.Fragment >
                <Grid item xs={6}>
                  <Typography textAlign="left" gutterBottom>PAYER NAME</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography  textAlign="right" gutterBottom>{props.taxPayerName}</Typography>
                </Grid>
              </React.Fragment>
              <React.Fragment >
                <Grid item xs={6}>
                  <Typography textAlign="left" gutterBottom>AMOUNT PAID</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography textAlign="right" gutterBottom> {props.amountToPay.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}  Rwf</Typography>
                </Grid>
              </React.Fragment>
              </Grid>
      
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography  textAlign="left" gutterBottom sx={{ mt: 2 }}>
         AGENT NAME
          </Typography>
          <Typography textAlign="left" gutterBottom>{props.agentName}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6} >
          <Typography variant="h6" textAlign="center" gutterBottom sx={{ mt: 2 }}>
          TRANSACTION DETAILS
          </Typography>
          <Grid container>
              <React.Fragment >
                <Grid item xs={6}>
                  <Typography textAlign="left" gutterBottom>TransactionID </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography  textAlign="right" gutterBottom>{props.transactionId}</Typography>
                </Grid>
              </React.Fragment>
              <React.Fragment >
                <Grid item xs={6}>
                  <Typography textAlign="left" gutterBottom>Description</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography textAlign="right" gutterBottom>RRA tax</Typography>
                </Grid>
              </React.Fragment>
              <React.Fragment >
                <Grid item xs={6}>
                  <Typography textAlign="left" gutterBottom>Date</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography textAlign="right" gutterBottom>{moment(props.dateTime).format("llll")}</Typography>
                </Grid>
              </React.Fragment>
              <React.Fragment >
                <Grid item xs={6}>
                  <Typography textAlign="left" gutterBottom>Status</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography textAlign="right" gutterBottom>{props.transactionStatus}</Typography>
                </Grid>
              </React.Fragment>
        
          </Grid>
        </Grid>
      </Grid>
      <Typography textAlign="left" gutterBottom>Signature: ____________________</Typography>
           </Grid>
          </Paper>
        </Container>
      </div>
    );
  });