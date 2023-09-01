import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import moment from 'moment';
import {useTranslation} from "react-i18next"
export default function Review({
 
}) {
  const { t } = useTranslation(["home","common","electricity"]);
  return (
    <React.Fragment>
       <Typography variant="h6" textAlign="center" gutterBottom>
          CLIENT PROFILE6
      </Typography>
      <List disablePadding>
          <ListItem  sx={{ py: 1, px: 0 ,textAlign:"center"}} >
            <ListItemText primary="Full Name"  secondary="Mahame Alfred" />
          </ListItem>
          <ListItem  sx={{ py: 1, px: 0 ,textAlign:"center"}} >
            <ListItemText primary="Phone Number" secondary="1223"/>
          </ListItem>
        
            <ListItem  sx={{ py: 1, px: 0 ,textAlign:"center"}} >
            <ListItemText primary="Email Address"  secondary="bernice@gmail.com" />
          </ListItem>

      </List>
     
    </React.Fragment>
  );
}