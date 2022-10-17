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
import Document from "../../../components/services/ltss/Document";
import Payment from "../../../components/services/ltss/Payment";
import Review from "../../../components/services/ltss/Review";
import { getLtssIdDetailsAction } from "../../../redux/actions/getLtssIdentificationAction";
import { ltssPaymentAction } from "../../../redux/actions/ltssPaymentAction";
import { useState,useEffect} from "react";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import jwt from "jsonwebtoken"
import ReactToPrint from "react-to-print";
import { ComponentToPrint } from "./ComponentToPrint";
import { useRef } from 'react';
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



const LtssForm = ({openLTSS,setOpenLTSS}) => {
  const componentRef = useRef();
  const steps = [`NID`, `Make Payment`, `View payment`];
  const [activeStep, setActiveStep] = React.useState(0);
  const dispatch = useDispatch();
  const getLtssIndDetails = useSelector((state) => state.getLtssIndDetails);
  const ltssPayment = useSelector((state) => state.ltssPayment);
  const [formData, setFormData] = useState({
    nId: "",
    phoneNumber: "",
    amountPaid:"",
    password: "",
  });
const [open, setOpen] = React.useState(true);
const [nIdErrorMessage,setNIdErrorMessage]=useState("");
const [errorMessage,setErrorMessage]=useState("")
const [identification,setIdentification]=useState("")
const [payerName,setPayerName]=useState("")

const [agentCategory,setAgentCategory]=useState("")

const [paymenterrorMessage, setPaymenterrorMessage] = useState("");
 const [phoneNumberError, setPhoneNumberError] = useState("");
 const [amountPaidError,setAmountPaidError]=useState('');
 const [passwordError, setPasswordError] = useState("");
 const [username, setUsername] = useState("");
 const [password,setPassword]=useState("")

 const [transactionId,setTransactionId]=useState("");
 const [transactionStatus,setTransactionStatus]=useState("");
 const [dateTime,setDateTime]=useState("")
 const [agentName,setAgentName]=useState("")
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Document
            formData={formData}
            setFormData={setFormData}
            nIdErrorMessage={nIdErrorMessage}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            open={open}
            setOpen={setOpen}
          />
        );
      case 1:
        return (
          <Payment
            formData={formData}
            setFormData={setFormData}
            payerName={payerName}
            identification={identification}
            amountPaidError={amountPaidError}
            phoneNumberError={phoneNumberError}
            passwordError={passwordError}
            open={open}
            setOpen={setOpen}
            paymenterrorMessage={paymenterrorMessage}
            setPaymenterrorMessage={setPaymenterrorMessage}
          />
        );
      case 2:
        return <Review 
        dateTime={dateTime}
         transactionId={transactionId}
         transactionStatus={transactionStatus}
         payerName={payerName}
         formData={formData}
         agentName={agentName}
        />;
      default:
        throw new Error("Unknown step");
    }
  };
  const decode= (token) => {
    const JWT_SECRET="tokensecret";
    const payload = jwt.verify(token, JWT_SECRET);
     return payload;
  }
  useEffect(() => {
    const token =localStorage.getItem('mobicashAuth');
    if (token) {
    const {group}=decode(token);
    const {username}=decode(token);
    const {name}=decode(token);
    const {password}=decode(token)
    setUsername(username)
    setAgentCategory(group)
    setAgentName(name)
    setPassword(password)

  }
 
  }, []);
  useEffect(() => {
    async function fetchData() {
      if (!getLtssIndDetails.loading) {
        if (getLtssIndDetails.details.length !== 0) {
          if (getLtssIndDetails.details.responseCode === 200) {
           setIdentification(getLtssIndDetails.details.identification)
           setPayerName(getLtssIndDetails.details.name)
            handleNext();
          } else {
            return null;
          }
          
        }
        if (getLtssIndDetails.error) {
          setErrorMessage(getLtssIndDetails.error);
        }
      }
    }
    fetchData();
   
  }, [getLtssIndDetails.details,getLtssIndDetails.error]);
 
  useEffect(()=>{
    async function fetchData(){
     if (!ltssPayment.loading) {
       if (ltssPayment.details.length !== 0) {
         if (ltssPayment.details.responseCode === 200) {
          setTransactionId(ltssPayment.details.mobicashTransctionNo)
          setDateTime(ltssPayment.details.date)
          setTransactionStatus(ltssPayment.details.status)
           handleNext();
         } else {
           return null;
         }
       }
       if (ltssPayment.error) {
         setPaymenterrorMessage(ltssPayment.error);
       }
     }
    
    }
    fetchData();
     },[ltssPayment.details,ltssPayment.error])
  //get ltss details
  const handleGetLtssNidDetails=async()=>{
   if(formData.nId==""){
    setNIdErrorMessage("NID is required")
   }
  else if(!Number(formData.nId)){
    setNIdErrorMessage("NID must be a number")
  }
  else if(formData.nId.length!==16){
    setNIdErrorMessage("NID must be 16 digit")
  }
  
  
   else{
    setNIdErrorMessage("")
 
    const identificationId=formData.nId
   await dispatch(getLtssIdDetailsAction({identificationId}))
   }
  }
  //ltss payment
  //handle cbhi payment
  const handleLtssPayment=async()=>{
    if(formData.amountPaid=="" && formData.phoneNumber==""&& formData.password=="" ){
      setAmountPaidError("Amount to pay is required")
      setPhoneNumberError("Payer phone number is required")
      setPasswordError("Agent pin is required")
    }
    else if(formData.amountPaid==""){
      setAmountPaidError("Amount to pay is required")
    }
    else if(!Number(formData.amountPaid)){
      setAmountPaidError("Amount to pay must be a number")
    }
    else if(formData.amountPaid%1000!==0){
      setAmountPaidError("Amount must be divisible by 1000")
    
    }  
    else if(formData.amountPaid > 2000000){
      setAmountPaidError("Amount to pay can not excide 2,000,000 Rwf")
    }
    else if(formData.phoneNumber==""){
      setPhoneNumberError("Payer phone number is required")
    }
    else if(!Number(formData.phoneNumber)){
      setPhoneNumberError("Payer phone number must be a number")
    }
    else if(formData.phoneNumber.length!==10){
      setPhoneNumberError("Payer phone number must be 10 digit")
    }
    else if(formData.password=="" ){
      setPasswordError("Agent pin is required")
    }
    else if (formData.password !== password ) {
      setPasswordError("Invalid pin,Please provide valid PIN");
    } 
    else{
      setAmountPaidError("")
      setPhoneNumberError("")
      setPasswordError("")
      const amountPaid=formData.amountPaid
      const password=formData.password
      const payerPhoneNumber=formData.phoneNumber
      await dispatch(ltssPaymentAction({
        identification,
        amountPaid,
        payerPhoneNumber,
        payerName,
        agentCategory,
      },username,password))
    
    }
  } 
  //handle on button submit for each step
  const handelSubmit = () => {
    if (activeStep === 0) {
      handleGetLtssNidDetails();
    } else if (activeStep === 1) {
      handleLtssPayment()
    } else if (activeStep === 2) {
      handleNext();
    } else {
      return null;
    }
    if (getLtssIndDetails.error) {
      setOpen(true);
    }
    if (ltssPayment.error) {
      setOpen(true);
    }
  };
  const handleNewpayment = () => {
    formData.nId=""
    getLtssIndDetails.details=['']
    ltssPayment.details=['']
    ltssPayment.error=['']
   setActiveStep(0)
   
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    formData.password = "";
    formData.nId=""
    setNIdErrorMessage("");
    setPasswordError("");
    setPhoneNumberError("");
    setErrorMessage("");
    setPaymenterrorMessage("");
   getLtssIndDetails.details=['']
   ltssPayment.details=['']
   getLtssIndDetails.error=['']
    setActiveStep(0);
    setOpenLTSS(false)
  };
  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container component="main" maxWidth="sm" sx={{display:{xs:"flex",sm:"flex",md:"block",lg:"block"}, mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
             <ThemeProvider theme={theme}>
           <Grid
           container
           direction="column"
           alignItems="center"
           justifyContent="center"
           
           >
              <Typography variant="h6" color="gray" >
          LTSS Service 
          </Typography>
           <img
                  src="../../../Assets/images/ejoheza.png"
                  alt="logo"
                  height={70}
                  width={85}
                />
           </Grid>
           </ThemeProvider>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
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
                  Thank you for using Mobicash
                  </Typography>
                  <Typography textAlign="center" variant="subtitle1">
                  You have successfully save your Long term saving scheme
                  </Typography>
                
                  <Button onClick={handleNewpayment} sx={{ mt: 3, ml: 1 }}>
                  New payment
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
                      Cancel
                      </Button>
                    ):null}

                    <Button
                      variant="outlined"
                      onClick={handelSubmit}
                      // sx={{ mt: 3, ml: 1 }}
                      sx={{ my: 1, mx: 1.5 }}
                    >
                      
                      {/* {activeStep === steps.length - 1 ? 'Mke payment' : 'Next'} */}
                      {activeStep === steps.length - 1
                        ?<>
                        <ReactToPrint
             trigger={() => <Button>Print receipt</Button>}
            content={() => componentRef.current}
               />
               <Box sx={{display:'none'}}>
               <ComponentToPrint 
               ref={componentRef} 
            
               />
               </Box>
                </>
                        : activeStep === 0
                        ? getLtssIndDetails.loading?
                        <Box sx={{ display: 'flex',justifyContent:"center" }}>
                        <CircularProgress  sx={{ color: 'orange'}} />
                         </Box>:"Submit"
                        : ltssPayment.loading?
                        <Box sx={{ display: 'flex',justifyContent:"center" }}>
                        <CircularProgress  sx={{ color: 'orange'}} />
                         </Box>:"Make Payment"}
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

export default LtssForm;
