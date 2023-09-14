import React, { useEffect } from 'react';
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
import { useSelector } from 'react-redux';
dotenv.config();


 const HomePage = (props) => {
  const { t } = useTranslation(["home","common","login"]);
  const getCbhiNidDetails=useSelector((state)=>state.getCbhiNidDetails)
const cbhiPayment = useSelector((state) => state.cbhiPayment);
const getElectricityDetails = useSelector((state) => state.getElectricityDetails);
const electricityPayment = useSelector((state) => state.electricityPayment);

const getLtssIndDetails = useSelector((state) => state.getLtssIndDetails);
const ltssPayment = useSelector((state) => state.ltssPayment);

const getRnitDetails= useSelector((state) => state.getRnitDetails);
const rnitPayment = useSelector((state) => state.rnitPayment);

const getDocDetails = useSelector((state) => state.getDocDetails);
const rraPayment = useSelector((state) => state.rraPayment);

const validateNid=useSelector((state)=>state.validateNid);
const openAccount=useSelector((state)=>state.openAccount);

const accountValidation=useSelector((state)=>state.accountValidation)
const deposit=useSelector((state)=>state.deposit)

const topUpMobileMoney=useSelector((state)=>state.topUpMobileMoney)
const changePassword=useSelector((state)=>state.changePassword)

const getRiaOrderDetails=useSelector((state)=>state.getRiaOrderDetails)
const clientValidation=useSelector((state)=>state.clientValidation);
const registerClient=useSelector((state)=>state.registerClient)
const riaDeposit=useSelector((state)=>state.riaDeposit)
useEffect(()=>{
async function fecthData(){
  changePassword.details=['']
  getCbhiNidDetails.details=['']
  cbhiPayment.details=['']
  getElectricityDetails.details=['']
  electricityPayment.details=['']
  getLtssIndDetails.details=['']
  ltssPayment.details=['']
  getRnitDetails.details=['']
  rnitPayment.details=['']

  getDocDetails.details=['']
  rraPayment.details=['']
  validateNid.details=['']
  openAccount.details=['']

  accountValidation.details=['']
  deposit.details=['']
  topUpMobileMoney.details=['']
  getRiaOrderDetails.details=['']
  clientValidation.details=['']

  registerClient.details=['']
  riaDeposit.details=['']

}
fecthData()
 },[getCbhiNidDetails.details,
  cbhiPayment.details,
  getElectricityDetails.details,
  electricityPayment.details,
  getLtssIndDetails.details,
  ltssPayment.details,
  getRnitDetails.details,
  rnitPayment.details,
  getDocDetails.details,
  rraPayment.details,
  accountValidation.details,
  deposit.details,
  topUpMobileMoney.details,
  getRiaOrderDetails.details,
  clientValidation.details,
  registerClient.details,
  riaDeposit.details

])
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