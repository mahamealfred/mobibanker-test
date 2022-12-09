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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation(["home","common","login","rra"]);

  const steps = [`${t("rra:referencenumber")}`, `${t("common:makepayment")}`, `${t("common:viewdetails")}`];
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
 const [clientCharges,setClientCharges]=useState("")
 const [password,setPassword]=useState("")
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
           errorMessage={errorMessage}

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
       tin={tin}
       taxTypeDesc={taxTypeDesc}
       clientCharges={clientCharges}
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
   const {password}=decode(token)
   setUsername(username)
   setBrokering(role)
   setUserGroup(group)
   setAgentName(name)
   setPassword(password)
   
 }

 }, []);
 useEffect(() => {
   async function fetchData() {
     if (!getDocDetails.loading) {
       if (getDocDetails.details.length !== 0) {
         if (getDocDetails.details.responseCode === 100) {
           setBankName(getDocDetails.details.data.bank_name);
           setRraRef(getDocDetails.details.data.RRA_REF);
           setTin(getDocDetails.details.data.TIN);
           setTaxPayerName(getDocDetails.details.data.TAX_PAYER_NAME);
           setTaxTypeDesc(getDocDetails.details.data.TAX_TYPE_DESC);
           setTaxCenterNo(getDocDetails.details.data.TAX_CENTRE_NO);
           setTaxTypeNo(getDocDetails.details.data.TAX_TYPE_NO);
           setAssessNo(getDocDetails.details.data.ASSESS_NO);
           setRraOrginNo(getDocDetails.details.data.RRA_ORIGIN_NO);
           setAmountToPay(getDocDetails.details.data.AMOUNT_TO_PAY);
           setDescId(getDocDetails.details.data.DEC_ID);
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
     if (rraPayment.details.responseCode === 100) {
       setTransactionId(rraPayment.details.data.mobicashTransctionNo)
       setDateTime(rraPayment.details.data.date)
       setTransactionStatus(rraPayment.details.communicationStatus)
       setClientCharges(rraPayment.details.data.transaction_fees)
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
     setDocIdErr(`${t("rra:referencenumberisrequired")}`);
   } else if (!Number(formData.docId)) {
     setDocIdErr(`${t("rra:referencenumbermutbeanumber")}`);
   }
  else if (formData.docId.length < 8) {
    setDocIdErr(`${t("rra:docidmustbeatleat8character")}`);
  }
   else {
    setDocIdErr("");
    setErrorMessage("")
     const docId = formData.docId;
     await dispatch(getDocDetailsAction({ docId }, history));
   }
 };




 //handle rra Payament
 const handlePayment = async () => {
   if (formData.phoneNumber === "") {
     setPhoneNumberError(`${t("common:phoneisrequired")}`);
   } else if (!Number(formData.phoneNumber)) {
     setPhoneNumberError(`${t("common:phonemustbeanumeric")}`);
   }else if (formData.password === "") {
     setPasswordError(`${t("common:passwordisrequired")}`);
   }
   else if (formData.password !== password ) {
    setPasswordError(`${t("common:invalidpin")}`);
  }
  else {
    setPhoneNumberError("")
    setPasswordError("")
    // setPaymenterrorMessage("")
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
   getDocDetails.loading=false
   rraPayment.loading=false
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
        {t("rra:rrataxpaymentservice")}
          </Typography>
           <img
                  src="../../../images/rra.png"
                  alt="logo"
                  height={70}
                  width={85}
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
                  {t("common:youhavesuccessfullypaid")} RRA 
                  </Typography>
                
                  <Button onClick={handleNewpayment} sx={{ mt: 3, ml: 1 }}>
                  {t("common:newpayment")}
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
                        ? <>
                        <ReactToPrint
             trigger={() => <Button> {t("common:receipt")}</Button>}
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
               rraRef={rraRef}
               tin={tin}
               taxTypeDesc={taxTypeDesc}
               clientCharges={clientCharges}
               />
               </Box>
                </>
                        : activeStep === 0
                        ? getDocDetails.loading?
                        <Box sx={{ display: 'flex',justifyContent:"center" }}>
                        <CircularProgress  sx={{ color: 'orange'}} />
                         </Box>:`${t("common:submit")}`
                        : rraPayment.loading?
                        <Box sx={{ display: 'flex',justifyContent:"center" }}>
                        <CircularProgress  sx={{ color: 'orange'}} />
                         </Box>:`${t("common:makepayment")}`}
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
