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
import Document from "../../../components/services/electricity/Document";
import Payment from "../../../components/services/electricity/Payment";
import Review from "../../../components/services/electricity/Review";
import { getDocDetailsAction } from "../../../redux/actions/getDocDetailsAction";
import { rraPayamentAction } from "../../../redux/actions/rraPaymentAction";
import { getElectricityDetailsAction } from "../../../redux/actions/electricityAction";
import { electricityPayamentAction } from "../../../redux/actions/electricitPaymentAction";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { useHistory } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import jwt from "jsonwebtoken";
import { ComponentToPrint } from './ComponentToPrint';
import ReactToPrint from 'react-to-print';
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

const EleCtricityForm = ({openELECTRICITY,setOpenELECTRICITY}) => {

  const steps = [`Meter number`, `Make payment`, `View Payment`];
  const [activeStep, setActiveStep] = React.useState(0);
  const dispatch = useDispatch();
  const getDocDetails = useSelector((state) => state.getDocDetails);
  const rraPayment = useSelector((state) => state.rraPayment);
  const getElectricityDetails = useSelector((state) => state.getElectricityDetails);
  const electricityPayment = useSelector((state) => state.electricityPayment);
  const [formData, setFormData] = useState({
    meterNumber: "",
    amountToPay:"",
    phoneNumber: "",
    taxIdentificationNumber:"",
    password: "",
  });
  const componentRef = useRef();

 //rra get details
 const [meterNumberErr, setMeterNumberErr] = useState("");
 const [errorMessage, setErrorMessage] = useState("");
 //rra payments
 const [paymenterrorMessage, setPaymenterrorMessage] = useState("");
 const [phoneNumberError, setPhoneNumberError] = useState("");
 const [passwordError, setPasswordError] = useState("");
 const [username, setUsername] = useState("");
 const [bankName, setBankName] = useState("");
 const [rraRef, setRraRef] = useState("");
 const [tin, setTin] = useState("");
 const [taxPayerName, setTaxPayerName] = useState("");
 const [taxTypeDesc, setTaxTypeDesc] = useState("");
 const [taxCenterNo, setTaxCenterNo] = useState("");
 const [taxTypeNo, setTaxTypeNo] = useState("");
 const [assessNo, setAssessNo] = useState("");
 const [rraOrginNo, setRraOrginNo] = useState("");
 const [amountToPay, setAmountToPay] = useState("");
 const [descId, setDescId] = useState("");
 const [payerPhone, setPayerPhone] = useState("");
 const [brokering, setBrokering] = useState("");
 const [userGroup, setUserGroup] = useState("");
 const [transactionId,setTransactionId]=useState("");
 const [transactionStatus,setTransactionStatus]=useState("");
 const [dateTime,setDateTime]=useState("")
 const [agentName,setAgentName]=useState("")

 const [payerName,setPayerName]=useState("");
 const [meter,setMeter]=useState("");
 const [amountTopayError,setAmountTopayError]=useState("")
 const [taxIdentificationNumberError,setTaxIdentificationNumberError]=useState("");
 const [openPayment,setOpenPayment]=useState(false);
 const [tokenValue,setTokenValue]=useState("");
 const [amountPaid,setAmountPaid]=useState("")


 //all

 const [open, setOpen] = React.useState(true);
 const [docDetails, setDocDetails] = useState("");


 const history = useHistory();

 const getStepContent = (step) => {
   switch (step) {
     case 0:
       return (
         <Document
           formData={formData}
           setFormData={setFormData}
           meterNumberErr={meterNumberErr}
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
           phoneNumberError={phoneNumberError}
           passwordError={passwordError}
           payerName={payerName}
           paymenterrorMessage={paymenterrorMessage}
           setPaymenterrorMessage={setPaymenterrorMessage}
           taxIdentificationNumberError={taxIdentificationNumberError}
           amountTopayError={amountTopayError}
           meterNumberErr={meterNumberErr}
           openPayment={openPayment}
           setOpenPayment={setOpenPayment}
         />
       );
     case 2:
       return <Review 
      //  dateTime={dateTime}
      //  transactionId={transactionId}
      //  transactionStatus={transactionStatus}
      //  payerName={payerName}
      //  amountPaid={amountPaid}
      //  agentName={agentName}
      //  tokenValue={tokenValue}
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
   const {username}=decode(token);
   const {role}=decode(token);
   const {group}=decode(token);
   const {name}=decode(token);
   setUsername(username)
   setBrokering(role)
   setUserGroup(group)
   setAgentName(name)
   
 }

 }, []);
 useEffect(() => {
   async function fetchData() {
     if (!getElectricityDetails.loading) {
       if (getElectricityDetails.details.length !== 0) {
         if (getElectricityDetails.details.responseCode === 200) {
          setPayerName(getElectricityDetails.details.consumer.customerName)
           handleNext();
         } else {
           return null;
         }
         //  console.log("doc ...doc",getDocDetails.details.responseCode)
       }
       if (getElectricityDetails.error) {
         setErrorMessage(getElectricityDetails.error);
       }
     }
   }
   fetchData();
  
 }, [getElectricityDetails.details]);

 useEffect(()=>{
async function fetchData(){
 if (!electricityPayment.loading) {
   if (electricityPayment.details.length !== 0) {
     if (electricityPayment.details.responseCode === 200) {
      console.log(":::",electricityPayment.details.mobicashref,electricityPayment.details.date,electricityPayment.details.response.token,
      electricityPayment.details.response.amountPaid)
      // setTransactionId(electricityPayment.details.mobicashref)
      // setDateTime(electricityPayment.details.date)
      // setTransactionStatus("success")
      // setTokenValue(electricityPayment.details.response.token)
      // setAmountPaid(electricityPayment.details.response.amountPaid)
      // console.log("ouput...",transactionId,dateTime,transactionStatus,tokenValue,amountPaid)
       handleNext();
     } else {
       return null;
     }
   }
   if (electricityPayment.error) {
     setPaymenterrorMessage(electricityPayment.error);
   }
 }

}
fetchData();
 },[electricityPayment.details,electricityPayment.error])

 //handle request for rra document id
 const handleMeterDetails = async () => {
   if (formData.meterNumber === "") {
     setMeterNumberErr("Meter is required");
   } else if (!Number(formData.meterNumber)) {
     setMeterNumberErr("Meter  must be a number");
   } else {
    setMeterNumberErr("");
     const meterNumber = formData.meterNumber;
     await dispatch(getElectricityDetailsAction({ meterNumber}));
   }
 };

 //handle electricity Payament
 const handlePayment = async () => {
    if(formData.amountToPay==""){
        setAmountTopayError("Amaount to pay is required")
    }
    else if(!Number(formData.amountToPay)){
        setAmountTopayError("Amount must be a number")
    }
    else if(formData.amountToPay < 100 || formData.amountToPay>1000000){
        setAmountTopayError("The minimum amount is 100 and the maximun is 1000000")  
    }
    else if(formData.taxIdentificationNumber==""){
   setTaxIdentificationNumberError("Customer Identification Number is required")
    }
    else if(!Number(formData.taxIdentificationNumber)){
        setTaxIdentificationNumberError("Identification Number must be a number")
    }
   else if (formData.phoneNumber === "") {
     setPhoneNumberError("Phone number is required");
   } else if (!Number(formData.phoneNumber)) {
     setPhoneNumberError("Phone number must be a number");
   } else if (formData.phoneNumber.length!==10) {
    setPhoneNumberError("Phone number must be 10 digit");
  }else if (formData.password === "") {
     setPasswordError("Password is required");
   } else {
    setAmountTopayError("")
    setPasswordError("")
    setPhoneNumberError("")
    setTaxIdentificationNumberError("")
     const payerPhoneNumber = formData.phoneNumber;
     const taxIdentificationNumber=formData.taxIdentificationNumber;
     const meterNumber=formData.meterNumber;
     const password = formData.password;
     const amount=formData.amountToPay
     await dispatch(electricityPayamentAction(
         { 
            amount,
          payerName,
           taxIdentificationNumber,
           payerPhoneNumber,
           meterNumber,
           userGroup,
           brokering,
         },
         username,
         password
        
       )
     );
     
   }
 };
 //handle on button submit for each step
 const handelSubmit = () => {
   if (activeStep === 0) {
     handleMeterDetails();
   } else if (activeStep === 1) {
  handlePayment();
    // handleNext();
   } else if (activeStep === 2) {

 handleNext()
   } else {
     return null;
   }
   if (getElectricityDetails.error) {
     setOpen(true);
   }
   if (electricityPayment.error) {
     setOpen(true);
   }
  
 };

 const handleNewpayment = () => {
  formData.meterNumber = "";
  formData.password = "";
  formData.phoneNumber = "";
  getElectricityDetails.details=['']
  getElectricityDetails.error=['']
  electricityPayment.details=['']
  electricityPayment.error=['']
  setActiveStep(0)
 };

 const handleNext = () => {
   setActiveStep(activeStep + 1);
 };

 const handleBack = () => {
   formData.password = "";
   formData.meterNumber=""
   setMeterNumberErr("");
   setPasswordError("");
   setPhoneNumberError("");
   setErrorMessage("");
   getElectricityDetails.error=['']
   setPaymenterrorMessage("");
   getElectricityDetails.details=['']
   electricityPayment.details=['']
   setActiveStep(0);
   setOpenELECTRICITY(false)
  
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
          Electricity Payment Service
          </Typography>
           <img
                  src="../../../Assets/images/electricity.png"
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
                  You have successfully paid your RRA tax
                  </Typography>
                
                  <Button onClick={handleNewpayment} sx={{ mt: 3, ml: 1 }}>
                  New Payment
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
                        ? <>
                      
                        <ReactToPrint
             trigger={() => <Button>Print receipt</Button>}
            content={() => componentRef.current}
               />
               <Box sx={{display:'none'}}>
               <ComponentToPrint 
                ref={componentRef} 
              //  dateTime={dateTime}
              //  transactionId={transactionId}
              //  transactionStatus={transactionStatus}
              //  agentName={agentName}
               />
               </Box>
                </>
                        : activeStep === 0
                        ? getElectricityDetails.loading?
                        <Box sx={{ display: 'flex',justifyContent:"center" }}>
                        <CircularProgress  sx={{ color: 'orange'}} />
                         </Box>:"Submit"
                        : electricityPayment.loading?
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

export default EleCtricityForm;
