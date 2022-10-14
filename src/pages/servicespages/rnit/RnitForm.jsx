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
import Document from "../../../components/services/rnit/Document";
import Payment from "../../../components/services/rnit/Payment";
import Review from "../../../components/services/rnit/Review";
import { useState,useEffect } from "react";
import { getRnitDetailsAction } from "../../../redux/actions/getRnitIdentificationDetailsAction";
import { rnitPaymentAction } from "../../../redux/actions/rnitPaymentAction";
import { useDispatch,useSelector } from "react-redux";
import { Grid } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import jwt from "jsonwebtoken";
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



const RnitForm = ({openRNIT,setOpenRNIT}) => {

  const steps = [`NID`, `Make payment`, `View Payment`];
  const [activeStep, setActiveStep] = React.useState(0);
  const dispatch = useDispatch();
  const getRnitDetails= useSelector((state) => state.getRnitDetails);
  const rnitPayment = useSelector((state) => state.rnitPayment);
  const [formData, setFormData] = useState({
    nId: "",
    bankAccount:"",
    bankName:"",
    payerEmail:"",
    phoneNumber: "",
    amountPaid:"",
    password: "",
    
  });

const [open, setOpen] = React.useState(true);
const [nIdErrorMessage,setNIdErrorMessage]=useState("");
const [errorMessage,setErrorMessage]=useState("")
const [identification,setIdentification]=useState("")
const [payerNid,setPayerNid]=useState('')
const [payerName,setPayerName]=useState('')
const [bankAccount,setBankAccount]=useState('')
const [username,setUsername]=useState('')
const [amountToPayErrorMessage,setAmountToPayErrorMessage]=useState('');
const [payerEmail,setPayerEmail]=useState('')
const [payerEmailErrorMessage,setPayerEmailErrorMessage]=useState('');
const [bankNameErrorMessage,setBankNameErrorMessage]=useState('');
const [bankAccountErrorMessage,setBankAccountErrorMessage]=useState('');
const [brokering,setBrokering]=useState('');
const [paymenterrorMessage, setPaymenterrorMessage] = useState("");
 const [phoneNumberError, setPhoneNumberError] = useState("");
 const [passwordError, setPasswordError] = useState("");
 const [transactionId,setTransactionId]=useState("");
 const [transactionStatus,setTransactionStatus]=useState("");
 const [dateTime,setDateTime]=useState("")
 const [agentName,setAgentName]=useState("");
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
            payerNid={payerNid}
            bankAccountErrorMessage={bankAccountErrorMessage}
            bankNameErrorMessage={bankNameErrorMessage}
            payerEmailErrorMessage={payerEmailErrorMessage}
            phoneNumberError={phoneNumberError}
            amountToPayErrorMessage={amountToPayErrorMessage}
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
    const {username}=decode(token);
    const {name}=decode(token)
    const {role}=decode(token);
    setUsername(username)
    setBrokering(role)
    setAgentName(name)
  }
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (!getRnitDetails.loading) {
        if (getRnitDetails.details.length !== 0) {
          if (getRnitDetails.details.responseCode === 200) {
            setPayerName(getRnitDetails.details.Response.fullName)
            setPayerNid(getRnitDetails.details.Response.nid)
            handleNext();
          } else {
            return null;
          }
        }
        if (getRnitDetails.error) {
          setErrorMessage(getRnitDetails.error);
        }
      }
    }
    fetchData();
  }, [getRnitDetails.details,getRnitDetails.error]);

  useEffect(()=>{
    async function fetchData(){
     if (!rnitPayment.loading) {
       if (rnitPayment.details.length !== 0) {
         if (rnitPayment.details.responseCode === 200) {
          setTransactionId(rnitPayment.details.mobicashTransctionNo)
          setDateTime(rnitPayment.details.date)
          setTransactionStatus(rnitPayment.details.status)
          handleNext();
         } else {
           return null;
         }
       }
       if (rnitPayment.error) {
         setPaymenterrorMessage(rnitPayment.error);
       }
     }
    
    }
    fetchData();
     },[rnitPayment.details,rnitPayment.error])

  //get rnit details
  const handleGetDetails=async()=>{
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
      const identification=formData.nId
  await dispatch(getRnitDetailsAction(identification))
     }
  }
  //rnit payment
  const handleRnitPayment=async()=>{
    if(formData.bankName=="" && formData.bankAccount=="" && formData.amountPaid=="" && formData.payerEmail=="" && formData.phoneNumber=="" && formData.password=="" ){
      setBankNameErrorMessage("Bank name is required")
      setBankAccountErrorMessage("Bank account is required")
      setPayerEmailErrorMessage("Payer email is required")
      setPhoneNumberError("Payer phone number is required")
      setPasswordError("Agent pin is required")
      setAmountToPayErrorMessage("Amount to pay is required")
    }
   else if(formData.bankName==""){
    setBankNameErrorMessage("Bank name is required")
       }
  else if(formData.bankAccount==""){
    setBankAccountErrorMessage("Bank account is required")
      }
else if(formData.amountPaid==""){
 setAmountToPayErrorMessage("Amount to pay is required")
 }
 else if(formData.payerEmail==""){
  setPayerEmailErrorMessage("Payer email is required")
    }
   
  else if(formData.phoneNumber==""){
    setPhoneNumberError("Payer phone number is required")
  }
  else if(!Number(formData.phoneNumber)){
    setPhoneNumberError("Payer phone number be a number")
  }
  else if(formData.phoneNumber.length !== 10){
    setPhoneNumberError("Payer phone number must be 10 digit")
  }
  else if(!formData.password){
    setPasswordError("Agent pin is required")
  }
  else{
    setBankNameErrorMessage("")
    setBankAccountErrorMessage("")
    setPayerEmailErrorMessage("")
    setPhoneNumberError("")
    setPasswordError("")
    setAmountToPayErrorMessage("")
    const password=formData.password
    const bankName=formData.bankName
    const bankAccount=formData.bankAccount
    const payerPhoneNumber=formData.phoneNumber
    const payerEmail=formData.payerEmail
    const amountToPay=formData.amountPaid
    await dispatch(rnitPaymentAction({
      bankName,
      bankAccount,
      payerNid,
      amountToPay,
      payerName,
      payerPhoneNumber,
      payerEmail,
      brokering
    },username,password));
  }
  }
  
  //handle on button submit for each step
  const handelSubmit = () => {
    if (activeStep === 0) {
   handleGetDetails()
    } else if (activeStep === 1) {
     handleRnitPayment();
    } else if (activeStep === 2) {
      handleNext();
    } else {
      return null;
    }
    if (getRnitDetails.error) {
      setOpen(true);
    }
    if (rnitPayment.error) {
      setOpen(true);
    }
    
  };

  const handleNewpayment = () => {
    formData.nId=""
    getRnitDetails.details=['']
    getRnitDetails.error=['']
    rnitPayment.details=['']
   setActiveStep(0)
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    formData.nId=""
    setBankNameErrorMessage("")
    setBankAccountErrorMessage("")
    setPayerEmailErrorMessage("")
    setPhoneNumberError("")
    setPasswordError("")
    setAmountToPayErrorMessage("")
    getRnitDetails.details=['']
    getRnitDetails.error=['']
    rnitPayment.details=['']
    setOpenRNIT(false)
    setActiveStep(0);
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
          RNIT Service 
          </Typography>
           <img
                  src="../../../Assets/images/rnit.png"
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
                  You have successfully paid your RNIT
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
                        ? "Print Receipt"
                        : activeStep === 0
                        ? getRnitDetails.loading?
                        <Box sx={{ display: 'flex',justifyContent:"center" }}>
                        <CircularProgress  sx={{ color: 'orange'}} />
                         </Box>:"Submit"
                        : rnitPayment.loading?
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

export default RnitForm;
