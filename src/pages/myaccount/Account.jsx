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
import { useTranslation } from "react-i18next";
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
    avatar: '../../images/balance1.png',
    avatar2: '../../images/commission.png',
    city: 'Rubavu',
    country: 'Rwanda',
    jobTitle: 'Independ',
    name: 'Bizimana Jean Claude 2',
    timezone: 'GTM7'
  };

 const Account = (props) => {
  const { t } = useTranslation(["home","common","login"]);
  const [values, setValues] = useState({
    firstName: 'Bizimana',
    lastName: 'Jean Cloude 2',
    email: 'jeancloude@gmail.com',
    phone: '0789595309',
    state: 'Gasabo',
    country: 'Rwanda'
  });
  const dispatch=useDispatch();
  const balance=useSelector(state=>state.balance);
  const [balanceDetails,setBalanceDetails]=useState([])
  const token = localStorage.getItem("mobicashAuth");
  const [agentName, setAgentName] = useState("");
  let today = new Date();
  let time = moment(today).format("l, hh:mm:ss");
  const decode = (token) => {
    const JWT_SECRET = "tokensecret";
    const payload = jwt.verify(token, JWT_SECRET);
    return payload;
  };
  useEffect(() => {
    if (token) {
      const { name } = decode(token);
      setAgentName(name);
    }
  }, []);
  useEffect(()=>{
    async function fetchData() {
      if (token) {
        const { username } = decode(token);
        const {password}= decode(token);
        await dispatch(getBalanceAction({username,password}))
      }
    }
    fetchData();
  },[])
  useEffect(()=>{
    async function fetchData() {
     
      if (!balance.loading) {
        if (balance.details){
          setBalanceDetails(balance.details.data)
        }
      }
    }
    fetchData();
  },[!balance.details])
  const handleChange = (event) => {

    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <React.Fragment>
         <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
        width: "100vw"
    
      }}
    >
       <Typography
          sx={{ mb: 2 }}
          variant="h5"
        
        >
       {t("common:accountbalance")}
        </Typography>
      <Container maxWidth="lg">
       
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
        {/* account */}
   
        <Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            height: 64,
            mb: 2,
            width: 64
          }}
        />
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h5"
        >
      {t("common:balance")}
        </Typography>
        {balance.loading ? (null ) : balance.details.data ? (
        <Typography
          color="textSecondary"
          variant="body2"
        >
     {balance.details.data[2].details.availableBalance.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} RWF
        </Typography>
           ):"No data"
          }
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {time}
        </Typography>
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
            lg={4}
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
        <Avatar
          src={user.avatar2}
          sx={{
            height: 64,
            mb: 2,
            width: 64
          }}
        />
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h5"
        >
      {t("common:commission")}
        </Typography>
        {balance.loading ? (null ) : balance.details.data ? (
        <Typography
          color="textSecondary"
          variant="body2"
        >
       {balance.details.data[3].details.availableBalance.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}  RWF
        </Typography>
        ):"No data"
      }
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {time}
        </Typography>
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
export default Account;