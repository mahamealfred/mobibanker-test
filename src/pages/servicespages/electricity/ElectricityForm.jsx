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
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid } from "@mui/material";
import { useHistory } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import jwt from "jsonwebtoken";
// import { ComponentToPrint } from './ComponentToPrint';
import ReactToPrint from 'react-to-print';
import { useRef } from 'react';
import { useTranslation } from "react-i18next";
import AuthContext from "../../../context";
import logo from "../../../assets/images/mobilogo.png"
const  ComponentToPrint=React.lazy(()=>import("./ComponentToPrint").then(module=>{
  return {default: module.ComponentToPrint}
}))
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

const EleCtricityForm = (props) => {
  const { i18n,t } = useTranslation(["home","common","login","rra"]);
  const steps = [`${t("electricity:meternumber")}`, `${t("common:makepayment")}`, `${t("common:viewdetails")}`];
  const [activeStep, setActiveStep] = React.useState(0);
  const dispatch = useDispatch();

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
 const [agentPhoneNumber,setAgentPhoneNumber]=useState("")
 const [payerName,setPayerName]=useState("");
 const [meter,setMeter]=useState("");
 const [amountTopayError,setAmountTopayError]=useState("")
 const [taxIdentificationNumberError,setTaxIdentificationNumberError]=useState("");
 const [openPayment,setOpenPayment]=useState(true);
 const [tokenValue,setTokenValue]=useState("");
 const [amountPaid,setAmountPaid]=useState("")
 const [password,setPassword]=useState("")

 //all
 const { auth }=React.useContext(AuthContext)
 const [open, setOpen] = React.useState(true);
 const [docDetails, setDocDetails] = useState("");
 const [openDialog,setOpenDialog]=useState(false);

 const [executing, setExecuting] = useState(false);
 const {
   disabled,
   onClick,
   ...otherProps
} = props;
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
       dateTime={dateTime}
       formData={formData}
       transactionId={transactionId}
       transactionStatus={transactionStatus}
       payerName={payerName}
       amountPaid={amountPaid}
       agentName={agentName}
       tokenValue={tokenValue}
       />;
     default:
       throw new Error("Unknown step");
   }
 };

 useEffect(() => {
   async function fetchData() {
     if (!getElectricityDetails.loading) {
       if (getElectricityDetails.details.length !== 0) {
         if (getElectricityDetails.details.responseCode === 100) {
          setPayerName(getElectricityDetails.details.data.customerName)
          setUsername(auth.username)
          setBrokering(auth.brokering)
          setUserGroup(auth.usergroup)
          setAgentName(auth.names)
          setAgentPhoneNumber(auth.phonenumber)
           handleNext();
         } else {
           return null;
         }
      
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
     if (electricityPayment.details.responseCode === 100) {
      setTransactionId(electricityPayment.details.data.mobicashTransctionNo)
      setDateTime(electricityPayment.details.data.date)
      setTransactionStatus(electricityPayment.details.communicationStatus)
      setTokenValue(electricityPayment.details.data.token)
      setMeter(electricityPayment.details.data.meterNo)
      setAmountPaid(electricityPayment.details.data.amountPaid)
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
     setMeterNumberErr(`${t("electricity:meternumberisrequired")}`);
   } else if (!Number(formData.meterNumber)) {
     setMeterNumberErr(`${t("electricity:meternumbermustbeanumeric")}`);
   } else {
    setMeterNumberErr("");
     const meterNumber = formData.meterNumber;
     await dispatch(getElectricityDetailsAction({ meterNumber}));
   }
 };

 //handle electricity Payament
 const handleElectricityPayment = async () => {
    if(formData.amountToPay==""){
        setAmountTopayError(`${t("common:amounttopay")}`)
    }
    else if(!Number(formData.amountToPay)){
        setAmountTopayError(`${t("common:amounttopayisrequired")}`)
    }
    else if(formData.amountToPay < 100 || formData.amountToPay>10000000){
        setAmountTopayError(`${t("electricity:theminimumamountis100andthemaximunis1,000,000")}`)  
    }
   else if (formData.phoneNumber === "") {
     setPhoneNumberError(`${t("common:phoneisrequired")}`);
   } else if (!Number(formData.phoneNumber)) {
     setPhoneNumberError(`${t("common:phonemustbeanumeric")}`);
   } else if (formData.phoneNumber.length!==10) {
    setPhoneNumberError(`${t("common:phonenumbermustbe10digit")}`);
  }else if (formData.password === "") {
     setPasswordError(`${t("common:passwordisrequired")}`);
   }
  //  else if (formData.password !== password ) {
  //   setPasswordError(`${t("common:invalidpin")}`);
  // } 
   else {
    setAmountTopayError("")
    setPasswordError("")
    setPhoneNumberError("")
    setTaxIdentificationNumberError("")
    setOpenDialog(true)
   }
 };

   //handle  payment
   const handlePayment =async()=>{
    setExecuting(true)
    setOpenDialog(false)
    const payerPhoneNumber = formData.phoneNumber;
    const meterNumber=formData.meterNumber;
    const password = formData.password;
    const amount=formData.amountToPay
    let taxIdentificationNumber=0
    if(formData.taxIdentificationNumber===""){
     taxIdentificationNumber="0000"
    }else{
     taxIdentificationNumber=formData.taxIdentificationNumber
    }
    try{
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
    }finally{
      setExecuting(false) 
    }
    
   }
   const handleClose=()=>{
    setOpenDialog(false)
   }
 //handle on button submit for each step
 const handelSubmit = () => {
   if (activeStep === 0) {
     handleMeterDetails();
   } else if (activeStep === 1) {
    handleElectricityPayment();
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
   getElectricityDetails.loading=false
   electricityPayment.loading=false
   setActiveStep(0);
   history.push("/dashboard",{push:true})
 };
  return (
    <div>
      <ThemeProvider theme={theme}>
        {/* <CssBaseline /> */}
        <Dialog
        //fullScreen={fullScreen}
        open={openDialog}
       // onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Grid container direction="row" alignItems="center">
        <DialogTitle id="responsive-dialog-title" sx={{color:"orange"}}>
        {t("common:warning")}
        </DialogTitle>
         </Grid>
         <Divider color="warning"/>
       
        <DialogContent>
          <DialogContentText textAlign="center" >
          {t("common:doyoureallywanttomakeapaymentof")}  {Number(formData.amountToPay).toLocaleString()} Rwf ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
          {t("common:disagree")} 
          </Button>
          <Button
            disabled={executing || disabled}
            {...otherProps}
          onClick={handlePayment} autoFocus>
          {t("common:agree")} 
          </Button>
        </DialogActions>
      </Dialog>
        <Box m="10px" >
    </Box>
        <Container component="main" maxWidth="sm" sx={{display:{xs:"block",sm:"block",md:"block",lg:"block"}, mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 4 } }}
          >
             <ThemeProvider theme={theme}>
           <Grid
           container
           direction="column"
           alignItems="center"
           justifyContent="center"
           
           >
           
           <Typography id="transition-modal-title" textAlign="center" variant="h6" component="h2">
         {t("electricity:electricitypaymentservice")}
          </Typography>
           <img
                  src="../../../images/electricity.png"
                  alt="logo"
                  height={70}
                  width={85}
                />
           </Grid>
           </ThemeProvider>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5,display:{xs:"inline",sm:"flex"}  }}>
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
                  {t("common:youhavesuccessfullypaid")} {t("electricity:electricity")}
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
             trigger={() => <Button>{t("common:receipt")}</Button>}
            content={() => componentRef.current}
               />
               <Box sx={{display:'none'}}>
               <ComponentToPrint 
                ref={componentRef} 
                dateTime={dateTime}
                
                transactionId={transactionId}
                transactionStatus={transactionStatus}
                payerName={payerName}
                amountPaid={amountPaid}
                agentName={agentName}
                agentPhoneNumber={agentPhoneNumber}
                tokenValue={tokenValue}
                meter={meter}
                logo={logo}
               />
               </Box>
                </>
                        : activeStep === 0
                        ? getElectricityDetails.loading?
                        <Box sx={{ display: 'flex',justifyContent:"center" }}>
                        <CircularProgress  sx={{ color: 'orange'}} />
                         </Box>:`${t("common:submit")}`
                        : electricityPayment.loading?
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

export default EleCtricityForm;
