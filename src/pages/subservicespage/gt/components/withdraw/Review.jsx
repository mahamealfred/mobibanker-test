import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import moment from 'moment';
import { useTranslation } from "react-i18next";

export default function Review() {
  const { t } = useTranslation(["home","common","rra"]);
  return (
    <React.Fragment>
            <Typography variant="h6" textAlign="center" gutterBottom>
            {t("common:transactiondetails")} 
      </Typography>
      <List disablePadding>
        
          <ListItem  sx={{ py: 1, px: 0 ,textAlign:"center"}} >
            <ListItemText primary="Account Name" secondary="Mahame alfred" />
          </ListItem>
          <ListItem  sx={{ py: 1, px: 0 ,textAlign:"center"}} >
            <ListItemText primary="Account Number" secondary="122334444" />
          </ListItem>
         
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary= "Amount Withdrew" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
        10000 Rwf
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary= "Mobicash reference"/>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          M425252
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary= {t("common:date")}/>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          12/122/2022
          </Typography>
        </ListItem>
      </List>

    </React.Fragment>
  );
}