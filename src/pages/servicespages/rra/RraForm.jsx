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
import Document from "../../../components/services/rra/Document";
import Payment from "../../../components/services/rra/Payment";
import Review from "../../../components/services/rra/Review";
import { getDocDetailsAction } from "../../../redux/actions/getDocDetailsAction";
import { rraPayamentAction } from "../../../redux/actions/rraPaymentAction";
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

const RraForm = ({openRRA,setOpenRRA}) => {

  const steps = [`Reference number`, `Make payment`, `View Payment`];
  const [activeStep, setActiveStep] = React.useState(0);
  const dispatch = useDispatch();
  const getDocDetails = useSelector((state) => state.getDocDetails);
  const rraPayment = useSelector((state) => state.rraPayment);
  const [formData, setFormData] = useState({
    docId: "",
    phoneNumber: "",
    password: "",
  });
  const componentRef = useRef();

 //rra get details
 const [docIdErr, setDocIdErr] = useState("");
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
           docIdErr={docIdErr}
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
           taxPayerName={taxPayerName}
           rraRef={rraRef}
           amountToPay={amountToPay}
           paymenterrorMessage={paymenterrorMessage}
           setPaymenterrorMessage={setPaymenterrorMessage}
           open={open}
           setOpen={setOpen}
           tin={tin}
           taxTypeDesc={taxTypeDesc}
           
         />
       );
     case 2:
       return <Review 
       dateTime={dateTime}
       transactionId={transactionId}
       transactionStatus={transactionStatus}
       taxPayerName={taxPayerName}
       amountToPay={amountToPay}
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
     if (!getDocDetails.loading) {
       if (getDocDetails.details.length !== 0) {
         if (getDocDetails.details.responseCode === 200) {
           setBankName(getDocDetails.details.bank_name);
           setRraRef(getDocDetails.details.RRA_REF);
           setTin(getDocDetails.details.TIN);
           setTaxPayerName(getDocDetails.details.TAX_PAYER_NAME);
           setTaxTypeDesc(getDocDetails.details.TAX_TYPE_DESC);
           setTaxCenterNo(getDocDetails.details.TAX_CENTRE_NO);
           setTaxTypeNo(getDocDetails.details.TAX_TYPE_NO);
           setAssessNo(getDocDetails.details.ASSESS_NO);
           setRraOrginNo(getDocDetails.details.RRA_ORIGIN_NO);
           setAmountToPay(getDocDetails.details.AMOUNT_TO_PAY);
           setDescId(getDocDetails.details.DEC_ID);
           handleNext();
         } else {
           return null;
         }
         //  console.log("doc ...doc",getDocDetails.details.responseCode)
       }
       if (getDocDetails.error) {
         setErrorMessage(getDocDetails.error);
       }
     }
   }
   fetchData();
  
 }, [getDocDetails.details]);

 useEffect(()=>{
async function fetchData(){
 if (!rraPayment.loading) {
   if (rraPayment.details.length !== 0) {
     if (rraPayment.details.responseCode === 200) {
      setTransactionId(rraPayment.details.mobicashTransctionNo)
      setDateTime(rraPayment.details.date)
      setTransactionStatus("success")
       handleNext();
     } else {
       return null;
     }
   }
   if (rraPayment.error) {
     setPaymenterrorMessage(rraPayment.error);
   }
 }

}
fetchData();
 },[rraPayment.details,rraPayment.error])

 //handle request for rra document id
 const handleDocmentDetails = async () => {
   if (formData.docId === "") {
     setDocIdErr("RRA reference is required");
   } else if (!Number(formData.docId)) {
     setDocIdErr("RRA  must be a number");
   } else {
     const docId = formData.docId;
     await dispatch(getDocDetailsAction({ docId }, history));
   }
 };




 //handle rra Payament
 const handlePayment = async () => {
   if (formData.phoneNumber === "") {
     setPhoneNumberError("Phone number is required");
   } else if (!Number(formData.phoneNumber)) {
     setPhoneNumberError("Phone number must be a number");
   } else if (formData.phoneNumber.length!==10) {
    setPhoneNumberError("Phone number must be 10 digit");
  }else if (formData.password === "") {
     setPasswordError("Password is required");
   } else {
     const payerPhoneNumber = formData.phoneNumber;
     const password = formData.password;
     await dispatch(rraPayamentAction(
         {
           bankName,
           rraRef,
           tin,
           taxPayerName,
           taxTypeDesc,
           taxCenterNo,
           taxTypeNo,
           assessNo,
           rraOrginNo,
           amountToPay,
           descId,
           payerPhoneNumber,
           userGroup,
           brokering,
         },
         username,
         password,
         history
       )
     );
     
   }
 };
 //handle on button submit for each step
 const handelSubmit = () => {
   if (activeStep === 0) {
     handleDocmentDetails();
   } else if (activeStep === 1) {
    handlePayment();
   } else if (activeStep === 2) {

 handleNext()
   } else {
     return null;
   }
   if (getDocDetails.error) {
     setOpen(true);
   }
   if (rraPayment.error) {
     setOpen(true);
   }
  
 };

 const handleNewpayment = () => {
  formData.docId = "";
  formData.password = "";
  formData.phoneNumber = "";
  getDocDetails.details=['']
  getDocDetails.error=['']
  rraPayment.details=['']
  rraPayment.error=['']
  setActiveStep(0)
 };

 const handleNext = () => {
   setActiveStep(activeStep + 1);
 };

 const handleBack = () => {
   formData.password = "";
   formData.docId=""
   setDocIdErr("");
   setPasswordError("");
   setPhoneNumberError("");
   setErrorMessage("");
   getDocDetails.error=['']
   setPaymenterrorMessage("");
   getDocDetails.details=['']
   rraPayment.details=['']
   setActiveStep(0);
   setOpenRRA(false)
  
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
          RRA Tax Payment Service
          </Typography>
           <img
                  src="../../../Assets/images/rra.png"
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
               dateTime={dateTime}
               transactionId={transactionId}
               transactionStatus={transactionStatus}
               taxPayerName={taxPayerName}
               amountToPay={amountToPay}
               agentName={agentName}
               />
               </Box>
                </>
                        : activeStep === 0
                        ? getDocDetails.loading?
                        <Box sx={{ display: 'flex',justifyContent:"center" }}>
                        <CircularProgress  sx={{ color: 'orange'}} />
                         </Box>:"Submit"
                        : rraPayment.loading?
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

export default RraForm;
