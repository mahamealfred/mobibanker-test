import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import moment from 'moment';
import { useTranslation } from "react-i18next";

export default function Review({
  names,
  mobilePhone,
  fullAccount,
  date
}) {
  const { t } = useTranslation(["home","common","rra"]);
  return (
    <React.Fragment>
            <Typography variant="h6" textAlign="center" gutterBottom>
            {t("common:transactiondetails")} 
      </Typography>
      <List disablePadding>
          <ListItem  sx={{ py: 1, px: 0 ,textAlign:"center"}} >
            <ListItemText primary="Names" secondary={names}/>
          </ListItem>
          <ListItem  sx={{ py: 1, px: 0 ,textAlign:"center"}} >
            <ListItemText primary="Account Number" secondary={fullAccount} />
          </ListItem>
          <ListItem  sx={{ py: 1, px: 0 ,textAlign:"center"}} >
            <ListItemText primary="Phone Number" secondary={mobilePhone} />
          </ListItem>
        {/* <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary= "Balance" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
        10000 Rwf
          </Typography>
        </ListItem> */}
       
        {/* <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary= "Mobicash reference"/>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          M425252
          </Typography>
        </ListItem> */}
      </List>
      <Grid container spacing={2}>
        <Grid item container direction="column" xs={12} sm={6}>
          <Grid container>
       
              <React.Fragment >
                {/* <Grid item xs={6}>
                  <Typography gutterBottom>{t("rra:taxtypedescription")}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Open an Account</Typography>
                </Grid> */}
                
                <Grid item xs={6}>
                  <Typography gutterBottom>{t("common:date")}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{moment(date).format("lll")}</Typography>
                </Grid>
               
              </React.Fragment>
         
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}