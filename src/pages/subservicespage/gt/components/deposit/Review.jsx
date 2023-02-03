import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import moment from 'moment';
import { useTranslation } from "react-i18next";

export default function Review({
  accountName,
  dateTime,
  amountDeposited,
  transactionId
}) {
  const { t } = useTranslation(["home","common","rra"]);
  return (
    <React.Fragment>
            <Typography variant="h6" textAlign="center" gutterBottom>
            {t("common:transactiondetails")} 
      </Typography>
      <List disablePadding>
        
          <ListItem  sx={{ py: 1, px: 0 ,textAlign:"center"}} >
            <ListItemText primary="Account Name" secondary={accountName} />
          </ListItem>
        
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary= "Amount deposited" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {amountDeposited.toLocaleString()} Rwf 
          </Typography>
        </ListItem>
       
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary= "GT Bank reference"/>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
       {transactionId}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary= {t("common:date")}/>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {moment(dateTime).format("ll")}
          </Typography>
        </ListItem>
      </List>

    </React.Fragment>
  );
}