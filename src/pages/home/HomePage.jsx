import React from 'react';
import { useState,useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography,
  Container,
  CardActions,
  Avatar
} from '@mui/material';
import { getBalanceAction } from '../../redux/actions/getBalanceAction';
import { useDispatch, useSelector } from "react-redux";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import moment from "moment";
import Service from '../services/Service';
import { useTranslation } from "react-i18next";
import Widget from '../../components/widget/Widget';
import { justifyCenter } from '../../components/styles/theme';
dotenv.config();
const states = [
  {
    value: 'Rubavu',
    label: 'Rubavu'
  },
  {
    value: 'Gasabo',
    label: 'Gasabo'
  },
  {
    value: 'Musanze',
    label: 'Musanze'
  }
];
const user = {
    avatar: '../../Assets/images/balance1.png',
    avatar2: '../../Assets/images/commission.png',
    city: 'Rubavu',
    country: 'Rwanda',
    jobTitle: 'Independ',
    name: 'Bizimana Jean Claude 2',
    timezone: 'GTM7'
  };

 const HomePage = (props) => {
  const { t } = useTranslation(["home","common","login"]);
  
  
 

  return (
    <React.Fragment>
         <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 4,
        width: "100vw"
    
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            lg={6}
            md={6}
            xs={12}
          >
        <Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
         justifyCenter:"center"
        }}
      >
        <Service/>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button
        color="primary"
        fullWidth
        variant="text"
      >
      </Button>
    </CardActions>
  </Card>
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            xs={12}
          >
            <Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
      <Widget/>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button
        color="primary"
        fullWidth
        variant="text"
      >
      </Button>
    </CardActions>
     </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
    </React.Fragment>
   
  );
};
export default HomePage ;