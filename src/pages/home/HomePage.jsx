import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Container,
  CardActions,
  CssBaseline,
} from '@mui/material';

import dotenv from "dotenv";
import Service from '../services/Service';
import { useTranslation } from "react-i18next";
import Widget from '../../components/widget/Widget';
dotenv.config();


 const HomePage = (props) => {
  const { t } = useTranslation(["home","common","login"]);
  
  return (
    <React.Fragment>
         <Box m="10px"
    >
     
      <CssBaseline/>
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