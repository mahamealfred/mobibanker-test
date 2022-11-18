import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import moment from 'moment';
import { useTranslation } from "react-i18next";
export default function Review({
  dateTime,
  transactionId,
  transactionStatus,
  payerName,
  formData,
  agentName
}) {
  const { t } = useTranslation(["home","common","rnit"]);
  return (
    <React.Fragment>
      <Typography variant="h6" textAlign="center" gutterBottom>
            {t("common:transactiondetails")} 
      </Typography>
      <List disablePadding>
          <ListItem  sx={{ py: 1, px: 0 ,textAlign:"center"}} >
            <ListItemText primary={t("common:payername")} secondary={payerName} />
          </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary= {t("common:amountpaid")}  />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {formData.amountPaid.toLocaleString()}  Rwf
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary= {t("common:mobicashreference")}  />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {transactionId}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item container direction="column" xs={12} sm={6}>
         
          <Grid container>
       
              <React.Fragment >
                <Grid item xs={6}>
                  <Typography gutterBottom>{t("common:date")}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{moment(dateTime).format("llll")}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{t("common:status")}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{transactionStatus}</Typography>
                </Grid>
              </React.Fragment>
         
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}