import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import jwt from "jsonwebtoken";

import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Document from "../../../components/services/cbhi/Document";
import Payment from "../../../components/services/cbhi/Payment";
import Review from "../../../components/services/cbhi/Review";
import { useState,useEffect } from "react";
import { getYearAction } from "../../../redux/actions/getYearAction";
import { getCbhiNidDetailsAction } from "../../../redux/actions/getCbhiNidDetailsAction";
import { cbhiPayamentAction } from "../../../redux/actions/cbhiPaymentAction";
import { useDispatch,useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { useHistory } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
// import { ComponentToPrint } from './ComponentToPrint';
import ReactToPrint from 'react-to-print';
import { useRef } from 'react';
import { useTranslation } from "react-i18next";
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



const CbhiIdentificationForm = ({openRSSB,setOpenRSSB}) => {
  const { i18n,t } = useTranslation(["home","common","login","cbhi"]);
  const getYear = useSelector((state) => state.getYear);
  const getCbhiNidDetails=useSelector((state)=>state.getCbhiNidDetails)
  const cbhiPayment = useSelector((state) => state.cbhiPayment);
  const componentRef = useRef();
  const dispatch = useDispatch();
  const steps = [`${t("common:nid")}`, `${t("common:makepayment")}`, `${t("common:viewdetails")}`];
  const [formData, setFormData] = useState({
    nId: "",
    paymentYear:"",
    amountPaid:"",
    phoneNumber: "",
    password: "",
  });
  
  const [activeStep, setActiveStep] = React.useState(0);

  const [years, setYears] = React.useState([]);
  const [nIdErrorMessage,setNIdErrorMessage]=useState("");
  const [paymentYearErrorMessage,setPaymentYearErrorMessage]=useState("")
  const [errorMessage,setErrorMessage]=useState("");
  const [open, setOpen] = React.useState(true);
  const [openPayment,setOpenPayment]= React.useState(true);
             //cbhi payment

  const [members,setMembers]=useState('');
  const [username,setUsername]=useState('')
  const [houseHoldNID,setHouseHoldNID]=useState('')
  const [payerName,setPayerName]=useState('');
  const [houseHoldCategory,seHouseHoldCategory]=useState('');
  const [householdMemberNumber,setHouseholdMemberNumber]=useState('');
  const [amountPaidBefore,setAmountPaidBefore]=useState("")
  const [totalPremium,setTotalPremium]=useState('');  
  const [brokering, setBrokering] = useState("");
  const [userGroup, setUserGroup] = useState("");
  //cbhi payment
  const [phoneNumberError,setPhoneNumberError]=useState('')
  const [amountPaidError,setAmountPaidError]=useState('');
  const [passwordError,setPasswordError]=useState('');
  const [paymentErrorMessage,setPaymentErrorMessage]=useState('');
  const [transactionId,setTransactionId]=useState("");
  const [transactionStatus,setTransactionStatus]=useState("");
  const [dateTime,setDateTime]=useState("");
  const [agentName,setAgentName]=useState("")
  const [agentPhoneNumber,setAgentPhoneNumber]=useState("");
 const [password,setPassword]=useState("")
  const history = useHistory();
  const { auth }=React.useContext(AuthContext)
  const decode= (token) => {
    const JWT_SECRET="tokensecret";
    const payload = jwt.verify(token, JWT_SECRET);
     return payload;
  }

useEffect(()=>{
  async function fetchData() {
    await dispatch(getYearAction());
  }
  fetchData()
},[])
  useEffect(() => {
    async function fetchData() {
   
      if (!getYear.loading) {
         if (getYear.years.length>0) {
        
          setYears(getYear.years);
        }
      }
       if(!getCbhiNidDetails.loading){
        if(getCbhiNidDetails.details.length!==0){
          if (getCbhiNidDetails.details.responseCode === 100) {
            await setMembers(getCbhiNidDetails.details.data.members);
            setHouseHoldNID(getCbhiNidDetails.details.data.headId)
            setPayerName(getCbhiNidDetails.details.data.headHouseHoldNames)
            seHouseHoldCategory(getCbhiNidDetails.details.data.houseHoldCategory)
            setHouseholdMemberNumber(getCbhiNidDetails.details.data.totalHouseHoldMembers)
            setTotalPremium(getCbhiNidDetails.details.data.totalAmount)
            setAmountPaidBefore(getCbhiNidDetails.details.data.totalPaidAmount)
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
        if(getCbhiNidDetails.error)  {
          setErrorMessage(getCbhiNidDetails.error);
        }
       }
  }
    fetchData();
  }, [getYear.years,getCbhiNidDetails.details,getCbhiNidDetails.error]); 
  useEffect(()=>{
    async function fetchData(){
     if (!cbhiPayment.loading) {
       if (cbhiPayment.details.length !== 0) {
         if (cbhiPayment.details.responseCode === 100) {
          setTransactionId(cbhiPayment.details.data.transactionNumber)
          setDateTime(cbhiPayment.details.data.date)
          //amount
          setTransactionStatus(cbhiPayment.details.communicationStatus)
           handleNext();
         } else {
           return null;
         }
       }
       if (cbhiPayment.error) {
         setPaymentErrorMessage(cbhiPayment.error);
       }
     }
    
    }
    fetchData();
     },[cbhiPayment.details,cbhiPayment.error])
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Document
          formData={formData}
          setFormData={setFormData}
          years={years}
          setYears={setYears}
          nIdErrorMessage={nIdErrorMessage}
          paymentYearErrorMessage={paymentYearErrorMessage}
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
          amountPaidError={amountPaidError}
          passwordError={passwordError}
          houseHoldNID={houseHoldNID}
          payerName={payerName}
          houseHoldCategory={houseHoldCategory}
          householdMemberNumber={householdMemberNumber}
         paymentErrorMessage={paymentErrorMessage}
         setPaymentErrorMessage={setPaymentErrorMessage}
         
          members={members}
          totalPremium={totalPremium}
          amountPaidBefore={amountPaidBefore}
          openPayment={openPayment}
          setOpenPayment={setOpenPayment}
          />
        );
      case 2:
        return <Review 
       payerName={payerName}
       formData={formData}
       transactionId={transactionId}
       transactionStatus={transactionStatus}
       houseHoldCategory={houseHoldCategory}
       householdMemberNumber={householdMemberNumber}
       dateTime={dateTime}
       agentName={agentName}
        />;
      default:
        throw new Error("Unknown step");
    }
  };
  //handel get cbhi nid details
  const getChiNid= async()=>{
    if(formData.nId=="" && formData.paymentYear==""){
    setNIdErrorMessage(`${t("cbhi:householdernidisrequired")}`)
    setPaymentYearErrorMessage(`${t("cbhi:pleaseselectyear")}`)
    }
    else if(formData.nId==""){
      setNIdErrorMessage(`${t("cbhi:householdernidisrequired")}`)
    }
    else if(!Number(formData.nId)){
      setNIdErrorMessage(`${t("cbhi:householdernidmustbeanumber")}`)
    }
 
    else if(formData.paymentYear==""){
      setPaymentYearErrorMessage(`${t("cbhi:pleaseselectyear")}`)
    }
    else{
      setNIdErrorMessage("")
      setPaymentYearErrorMessage("")
      const nid=formData.nId
      const year=formData.paymentYear
   await dispatch(getCbhiNidDetailsAction({nid,year},history))
    } 
  }
  //handle cbhi payment
  const handleCbhiPayment=async()=>{
    if(formData.amountPaid=="" && formData.phoneNumber==""&& formData.password=="" ){
      setAmountPaidError(`${t("common:amounttopayisrequired")}`)
      setPhoneNumberError(`${t("common:phoneisrequired")}`)
      setPasswordError(`${t("common:agenytpinisrequired")}`)
    }
    else if(formData.amountPaid==""){
      setAmountPaidError(`${t("common:amounttopayisrequired")}`)
    }
    else if(!Number(formData.amountPaid)){
      setAmountPaidError(`${t("common:amounttopaymustbeanumber")}`)
    }
    else if(formData.amountPaid<1000){
      setAmountPaidError(`${t("cbhi:theminimumamounttopayis1000")}`)
    
    } 
    else if(formData.amountPaid%1000!==0){
      setAmountPaidError(`${t("cbhi:amountmustbedivisibleby1000")}`)
    
    }  
   
    else if(formData.amountPaid > 2000000){
      setAmountPaidError(`${t("cbhi:amounttopaycannotexcide2,000,000Rwf")}`)
    }
    else if(formData.phoneNumber==""){
      setPhoneNumberError(`${t("common:phoneisrequired")}`)
    }
    else if(!Number(formData.phoneNumber)){
      setPhoneNumberError(`${t("common:phonemustbeanumeric")}`)
    }
    else if(formData.phoneNumber.length!==10){
      setPhoneNumberError(`${t("common:phonenumbermustbe10digit")}`)
    }
    else if(formData.password=="" ){
      setPasswordError(`${t("common:agenytpinisrequire")}`)
    }
    // else if (formData.password !== password ) {
    //   setPasswordError(`${t("common:invalidpin")}`);
    // } 
    else{
      setAmountPaidError("")
      setPhoneNumberError("")
      setPasswordError("")
      const amountPaid=formData.amountPaid
      const paymentYear=formData.paymentYear
      const password=formData.password
      const payerPhoneNumber=formData.phoneNumber
      await dispatch(cbhiPayamentAction({
        houseHoldNID,
        paymentYear,
        amountPaid,
        payerName,
        houseHoldCategory,
        householdMemberNumber,
        totalPremium,
        payerPhoneNumber,
        brokering,
        userGroup
      },username,password,history))
    
    }
  }
  
  //handle on button submit for each step
  const handelSubmit = () => {
    if (activeStep === 0) {
    getChiNid();
    } else if (activeStep === 1) {
     handleCbhiPayment();
    } else if (activeStep === 2) {
      handleNext();
    } else {
      return null;
    }
    if(getCbhiNidDetails.error)  {
   setOpen(true)
    }
    if (cbhiPayment.error) {
      setOpenPayment(true)
    }
  };

  const handleNewpayment = () => {
    formData.nId=""
    formData.paymentYear=""
    formData.amountPaid=""
    formData.password=""
    formData.phoneNumber=""
    getCbhiNidDetails.details=['']
    cbhiPayment.details=['']
    setActiveStep(0)
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    formData.nId=""
    formData.paymentYear=""
    setAmountPaidError("")
      setPhoneNumberError("")
      setPasswordError("")
    getCbhiNidDetails.details=['']
    cbhiPayment.details=['']
    getCbhiNidDetails.error=['']
    getCbhiNidDetails.loading=false
    cbhiPayment.loading=false
    setActiveStep(0);
    history.push("/dashboard",{push:true})
    //setOpenRSSB(false)

  };
  return (
    <div>
      <ThemeProvider theme={theme}>
        {/* <CssBaseline /> */}
        <Box m="10px"
    >
    
    </Box>
        <Container component="main" maxWidth="sm" sx={{display:{xs:"block",sm:"block",md:"block",lg:"block"}, mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 1, md: 2 }, p: { xs: 4, md: 6 } }}
          >
             <ThemeProvider theme={theme}>
           <Grid
           container
           direction="column"
           alignItems="center"
           justifyContent="center"
           
           >
            
            <Typography id="transition-modal-title" textAlign="center" variant="h6" component="h2">
          {t("cbhi:rssbmutuellepaymentservice")}
          </Typography>
           <img
                  src="../../../images/mutuelli.png"
                  alt="logo"
                  height={70}
                  width={85}
                />
           </Grid>
           </ThemeProvider>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 ,display:{xs:"inline",sm:"flex"} }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                  {t("common:thankyouforusingmobicash")}
                  </Typography>
                  <Typography variant="subtitle1">
                  {t("common:youhavesuccessfullypaid")} Mutuelle {t("common:year")} {formData.paymentYear}
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
               payerName={payerName}
               formData={formData}
               transactionId={transactionId}
               transactionStatus={transactionStatus}
               houseHoldCategory={houseHoldCategory}
               householdMemberNumber={householdMemberNumber}
               dateTime={dateTime}
               agentName={agentName}
               agentPhoneNumber={agentPhoneNumber}
               logo={logo}
               />
               </Box>
                </>
                        : activeStep === 0
                        ? getCbhiNidDetails.loading?
                        <Box sx={{ display: 'flex',justifyContent:"center" }}>
                        <CircularProgress  sx={{ color: 'orange'}} />
                         </Box>:`${t("common:submit")}`
                        : cbhiPayment.loading?
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

export default CbhiIdentificationForm;
