import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Document from "../components/deposit/Document";
import Account from "../components/deposit/Account";
import Review from "../components/deposit/Review";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { useHistory } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import jwt from "jsonwebtoken";
import ReactToPrint from 'react-to-print';
import { useRef } from 'react';
import { useTranslation } from "react-i18next";
import CardMedia from "@mui/material/CardMedia";

import {accountValidationAction } from "../../../../redux/actions/accountValidationAction";
import { valiateNidDetailsDetailsAction } from "../../../../redux/actions/validateNidAction";
import { depositAction } from "../../../../redux/actions/depositAction";
import { SettingsPhone } from "@mui/icons-material";
const theme = createTheme();

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.4rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.6rem',
  },
};

const Deposit = ({}) => {
  const { t } = useTranslation(["home","common","login","rra"]);

  const steps = ['Account Number', 'Amount', 'View Details'];
  const [activeStep, setActiveStep] = React.useState(0);
  const dispatch = useDispatch();
const history=useHistory();
const accountValidation=useSelector((state)=>state.accountValidation)
const deposit=useSelector((state)=>state.deposit)
const [open, setOpen] = React.useState(true);
const [accountNumberErr, setAccountNumberErr] = useState("");
const [errorMessage, setErrorMessage] = useState("");
const [destinationErr,setDestinationErr]=useState("");
const [amountErr,setAmountErr]=useState("");
const [depositerrorMessage,setDepositerrorMessage]=useState("");

const [username,setUsername]=useState("");
const [brokering, setBrokering] = useState("");
const [userGroup, setUserGroup] = useState("");
const [transactionId,setTransactionId]=useState("");
const [transactionStatus,setTransactionStatus]=useState("");
const [dateTime,setDateTime]=useState("")
const [agentName,setAgentName]=useState("")
const [clientCharges,setClientCharges]=useState("")
const [password,setPassword]=useState("")
const [accountName,setAccountName]=useState("");
const [debit,setDebit]=useState("");
const [credit,setCredit]=useState("");
const [phone,setPhone]=useState("");
const [amountDeposited,setAmountDeposited]=useState("");
//all
  const [formData, setFormData] = useState({
    accountNumber: "",
    amount: "",
    destination:"",
    password: "",
  });

 const getStepContent = (step) => {
   switch (step) {
     case 0:
       return (
         <Document
         formData={formData}
         setFormData={setFormData}
         accountNumberErr={accountNumberErr}
         errorMessage={errorMessage}
         setErrorMessage={setErrorMessage}
         open={open}
         setOpen={setOpen}
         />
       );
     case 1:
       return (
         <Account
         formData={formData}
         setFormData={setFormData}
         amountErr={amountErr}
         accountName={accountName}
         debit={debit}
         phone={phone}
        //  destinationErr={destinationErr}
         depositerrorMessage={depositerrorMessage}
         setDepositerrorMessage={setDepositerrorMessage}
         open={open}
         setOpen={setOpen}
         />
       );
     case 2:
       return <Review 
       formData={formData}
       setFormData={setFormData}
       accountName={accountName}
       dateTime={dateTime}
       amountDeposited={amountDeposited}
       transactionId={transactionId}
       />;
     default:
       throw new Error("Unknown step");
   }
 };
 //render account details
 useEffect(() => {
  async function fetchData() {
    if (!accountValidation.loading) {
      if (accountValidation.details.length !== 0) {
        if (accountValidation.details.responseCode === 100) {
          setDebit(accountValidation.details.data.fullAccount)
          setAccountName(accountValidation.details.data.names)
          setPhone(accountValidation.details.data.mobileNumber)
          setCredit(formData.accountNumber)
          handleNext();
        } else {
          return null;
        }
      
      }
      if (accountValidation.error) {
        setErrorMessage(accountValidation.error);
      }
    }
  }
  fetchData();
}, [accountValidation.details]);
 //handle validate account 
const handleValidateAccount=async()=>{
   if(formData.accountNumber===""){
    setAccountNumberErr("Account is required")
   }
   else if(!Number(formData.accountNumber)){
    setAccountNumberErr("Account must be a number")
   }
   else{
    setAccountNumberErr("")
    setErrorMessage("")
    const accountNumber= formData.accountNumber;
    await dispatch(accountValidationAction({accountNumber}))
   // handleNext()
   }
  // handleNext()
}

//fecth deposit information

useEffect(()=>{
  async function fetchData(){
   if (!deposit.loading) {
     if (deposit.details.length !== 0) {
       if (deposit.details.responseCode === 100) {
        setAmountDeposited(deposit.details.data.amount)
        setTransactionId(deposit.details.data.reference)
        setDateTime(deposit.details.responseDate)
         handleNext();
       } else {
         return null;
       }
     }
     if (deposit.error) {
       setDepositerrorMessage(deposit.error);
     }
   }
  
  }
  fetchData();
   },[deposit.details,deposit.error])
  
// handle deposit
const handleDeposit=async()=>{
  if(formData.amount==='' ){
    setAmountErr("Amount is required")
  }
  else if(!Number(formData.amount)){
setAmountErr("Amount must be a numeric")
  }
//   else if(formData.destination===""){
//     setDestinationErr("Please select the destination")
// }
else{
  setAmountErr("")
  setDestinationErr("")
  setDepositerrorMessage("")
  const amount=formData.amount
  // const destination=formData.destination

await dispatch(depositAction({amount,debit,credit,accountName,phone,brokering,userGroup},username,password))
}
}
//agent infromation
const decode= (token) => {
  const JWT_SECRET="tokensecret";
  const payload = jwt.verify(token, JWT_SECRET);
   return payload;
}
useEffect(() => {
  const token =localStorage.getItem('mobicashAuth');
  if (token) {
  const {username}=decode(token);
  const {role}=decode(token);
  const {group}=decode(token);
  const {name}=decode(token);
  const {password}=decode(token);
  setUsername(username)
  setBrokering(role)
  setUserGroup(group)
  setAgentName(name)
  setPassword(password)
}
}, []);
 //handle on button submit for each step
 const handelSubmit = () => {
   if (activeStep === 0) {
   // handleNext()
     handleValidateAccount();
   } else if (activeStep === 1) {
   // handleNext()
   handleDeposit()
   } else if (activeStep === 2) {
 handleNext()
   } else {
     return null;
   }
   
   if (accountValidation.error) {
    setOpen(true);
  }
  if (deposit.error) {
    setOpen(true);
  }
  
 };

 const handleNewpayment = () => {
  formData.accountNumber = "";
  formData.amount = "";
  accountValidation.details=['']
  accountValidation.error=['']
  deposit.details=['']
  deposit.error=['']
  setActiveStep(0)
 };

 const handleNext = () => {
   setActiveStep(activeStep + 1);
 };

 const handleBack = () => {
  formData.password = "";
  formData.amount=""
  formData.accountNumber=""
  setAmountErr("");
  //setPasswordError("");
  setAccountNumberErr("");
  setErrorMessage("");
  accountValidation.error=['']
  setDepositerrorMessage("");
  accountValidation.details=['']
  deposit.details=['']
  accountValidation.loading=false
  deposit.loading=false
  setActiveStep(0);
  history.push("/dashboard",{push:true})
   //setOpenRRA(false)
  
 };
  return (
    <div>
      <ThemeProvider theme={theme}>
        {/* <CssBaseline /> */}
        <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 1,
        width: "100vw"
      }}
    >
    </Box>
        <Container component="main" maxWidth="sm" sx={{display:{xs:"block",sm:"block",md:"block",lg:"block"}, mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 2 } }}
          >
             <ThemeProvider theme={theme}>
           <Grid
           container
           direction="column"
           alignItems="center"
           justifyContent="center"
           
           >
            <Typography variant="h6" color="gray" 
              sx={{ fontSize:{xs:14,md:16,lg:20} }}
            >
           DEPOSIT
          </Typography>
          <CardMedia
                    component="img"
                    height="60"
                    image="../../images/gtbank.png"
                    alt="alt"
                    title="i"
                    sx={{  objectFit: "contain",
                    height:{xs:40,sm:40,md:60,lg:60}}}
                />
           </Grid>
           </ThemeProvider>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5,display:{xs:"inline",sm:"flex"} }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" textAlign="center" gutterBottom>
                  {t("common:thankyouforusingmobicash")}
                  </Typography>
                  <Typography textAlign="center" variant="subtitle1">
                  You have successfully deposit 
                  </Typography>
                
                  <Button onClick={handleNewpayment} sx={{ mt: 3, ml: 1 }}>
                New Deposit
                  </Button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    {activeStep == 0 || activeStep !==2? (
                      <Button onClick={handleBack} 
                     //sx={{ mt: 3, ml: 1 }}
                      sx={{ my: 1, mx: 1.5 }}
                      >
                 {t("common:cancel")}
                      </Button>
                    ):null}

                    <Button
                      onClick={handelSubmit}
                      // sx={{ mt: 3, ml: 1 }}
                      sx={{ my: 1, mx: 1.5 }}
                    >
                      {/* {activeStep === steps.length - 1 ? 'Mke payment' : 'Next'} */}
                      {activeStep === steps.length - 1
                        ? 'Receipt'
                        : activeStep === 0
                        ? accountValidation.loading?
                        <Box sx={{ display: 'flex',justifyContent:"center" }}>
                        <CircularProgress  sx={{ color: 'orange'}} />
                         </Box>:`${t("common:submit")}`
                        :deposit.loading?
                        <Box sx={{ display: 'flex',justifyContent:"center" }}>
                        <CircularProgress  sx={{ color: 'orange'}} />
                         </Box>:`Make Deposit`
                        }
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Deposit;
