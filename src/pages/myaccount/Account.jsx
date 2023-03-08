import React from 'react';
import { useState,useEffect,useContext } from 'react';
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
import AuthContext from '../../context';
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
  const { auth }=useContext(AuthContext)

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
 
  useEffect(() => {
    async function fecthData(){
   if(auth){
    await dispatch(getBalanceAction(auth))
   }
    }
  fecthData();
  
    }, [auth]);
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
       <Box m="10px">
       <Typography 
          component="h1" variant="h6"
          color="gray"
          textAlign="center"
          padding="0 0px 30px 0px"
          sx={{ fontSize: { xs: 20 },mb:2 }}
        >
       {t("common:accountbalance")}
        </Typography>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
          style={{display:'flex',justifyContent:'center',alignItems:'center'}}
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
        Balance
        </Typography>
        {balance.loading ? (null ) : balance.details.data ? (
       <>
         Float
        <Typography
          color="textSecondary"
          variant="body2"
        >
   {balance.details.data[1].details.balance.toLocaleString()} RWF
        </Typography>
        Reserved Float
        <Typography
          color="textSecondary"
          variant="body2"
        >
  {balance.details.data[1].details.reservedAmount.toLocaleString()} RWF
        </Typography>
        Available Float
        <Typography
          color="textSecondary"
          variant="body2"
        >
     {balance.details.data[1].details.availableBalance.toLocaleString()} RWF
        </Typography>
       </>
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
     Instant Commission
        </Typography>
        {balance.loading ? (null ) : balance.details.data ? (
        <Typography
          color="textSecondary"
          variant="body2"
        >
     {balance.details.data[3].details.availableBalance.toLocaleString()}  RWF
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
      disabled
        color="primary"
        fullWidth
        variant="text"
      >
    Self Payment
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
    Delayed Commission
        </Typography>
        {balance.loading ? (null ) : balance.details.data ? (
        <Typography
          color="textSecondary"
          variant="body2"
        >
     {balance.details.data[0].details.availableBalance.toLocaleString()} RWF
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