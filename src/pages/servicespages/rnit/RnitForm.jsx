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
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import jwt from "jsonwebtoken";
// import { ComponentToPrint } from './ComponentToPrint';
import ReactToPrint from 'react-to-print';
import { useRef } from 'react';
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import AuthContext from "../../../context";
import logo from "../../../assets/images/logo.png"
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



const RnitForm = ({openRNIT,setOpenRNIT}) => {
  const { t } = useTranslation(["home","common","login","rnit"]);
  const componentRef = useRef();
  const steps = [`${t("common:nid")}`,  `${t("common:makepayment")}`, `${t("common:viewdetails")}`];
  const [activeStep, setActiveStep] = React.useState(0);
  const dispatch = useDispatch();
  const getRnitDetails= useSelector((state) => state.getRnitDetails);
  const rnitPayment = useSelector((state) => state.rnitPayment);
  const { auth }=React.useContext(AuthContext)

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
 const [agentPhoneNumber,setAgentPhoneNumber]=useState("")
 const [password,setPassword]=useState("")
 const [userGroup,setUserGroup]=useState("")
 const [openDialog,setOpenDialog]=useState(false)
 const history = useHistory();
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


  useEffect(() => {
    async function fetchData() {
      if (!getRnitDetails.loading) {
        if (getRnitDetails.details.length !== 0) {
          if (getRnitDetails.details.responseCode === 100) {
            setPayerName(getRnitDetails.details.data.fullName)
            setPayerNid(getRnitDetails.details.data.nid)
            setUsername(auth.username);
            setUserGroup(auth.usergroup);
            setBrokering(auth.brokering);
            setAgentName(auth.names)
            setAgentPhoneNumber(auth.phonenumber)
          
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
         if (rnitPayment.details.responseCode === 100) {
          setTransactionId(rnitPayment.details.data.mobicashTransctionNo)
          setDateTime(rnitPayment.details.data.date)
          setTransactionStatus(rnitPayment.details.communicationStatus)
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
      setNIdErrorMessage(`${t("common:nidisrequired")}`)
     }
    else if(!Number(formData.nId)){
      setNIdErrorMessage(`${t("common:nidmustbenumeric")}`)
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
      setBankNameErrorMessage(`${t("rnit:banknameisrequired")}`)
      setBankAccountErrorMessage(`${t("rnit:bankaccountisrequired")}`)
      setPayerEmailErrorMessage(`${t("rnit:payeremailisrequired")}`)
      setPhoneNumberError(`${t("common:phoneisrequired")}`)
      setPasswordError(`${t("common:agenytpinisrequired")}`)
      setAmountToPayErrorMessage(`${t("common:amounttopayisrequired")}`)
    }
   else if(formData.bankName==""){
    setBankNameErrorMessage(`${t("rnit:banknameisrequired")}`)
       }
  else if(formData.bankAccount==""){
    setBankAccountErrorMessage(`${t("rnit:bankaccountisrequired")}`)
      }
else if(formData.amountPaid==""){
 setAmountToPayErrorMessage(`${t("common:amounttopayisrequired")}`)
 }
 else if(!Number(formData.amountPaid)){
  setAmountToPayErrorMessage(`${t("common:amounttopaymustbeanumber")}`)
}
else if(formData.amountPaid > 2000000){
  setAmountToPayErrorMessage(`${t("common:amounttopaycannotexcide2,000,000Rwf")}`)
}
 else if(formData.payerEmail==""){
  setPayerEmailErrorMessage(`${t("rnit:payeremailisrequired")}`)
    }
   
  else if(formData.phoneNumber==""){
    setPhoneNumberError(`${t("common:phoneisrequired")}`)
  }
  else if(!Number(formData.phoneNumber)){
    setPhoneNumberError(`${t("common:phonemustbeanumeric")}`)
  }
  else if(formData.phoneNumber.length !== 10){
    setPhoneNumberError(`${t("common:phonenumbermustbe10digit")}`)
  }
  else if(!formData.password){
    setPasswordError(`${t("common:agenytpinisrequire")}`)
  }

  
  else{
    setBankNameErrorMessage("")
    setBankAccountErrorMessage("")
    setPayerEmailErrorMessage("")
    setPhoneNumberError("")
    setPasswordError("")
    setAmountToPayErrorMessage("")
    setOpenDialog(true)
   
  }
  }
   //handle cbhi payment
   const handlePayment =async()=>{
    setOpenDialog(false)
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
      brokering,
      userGroup
    },username,password));
   }

   //handleClose
   const handleClose=()=>{
    setOpenDialog(false)
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
    getRnitDetails.loading=false
    rnitPayment.loading=false
    setActiveStep(0);
   
    history.push("/dashboard",{push:true})
    // setOpenRNIT(false)
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
          {t("common:doyoureallywanttomakeapaymentof")}  {Number(formData.amountPaid).toLocaleString()} Rwf ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
          {t("common:disagree")} 
          </Button>
          <Button onClick={handlePayment} autoFocus>
          {t("common:agree")} 
          </Button>
        </DialogActions>
      </Dialog>


        <Box m="10px"
    >
     
 
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
       {t("rnit:rnitpaymentservice")}
          </Typography>
           <img
                  src="../../../images/rnit.png"
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
                  {t("common:youhavesuccessfullypaid")} RNIT
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
               formData={formData}
               dateTime={dateTime}
               transactionId={transactionId}
               transactionStatus={transactionStatus}
               payerName={payerName}
               agentName={agentName}
               agentPhoneNumber={agentPhoneNumber}
               logo={logo}
               />
               </Box>
                </>
                        : activeStep === 0
                        ? getRnitDetails.loading?
                        <Box sx={{ display: 'flex',justifyContent:"center" }}>
                        <CircularProgress  sx={{ color: 'orange'}} />
                         </Box>:`${t("common:submit")}`
                        : rnitPayment.loading?
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

export default RnitForm;
