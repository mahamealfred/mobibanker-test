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



const CbhiIdentificationForm = ({openRSSB,setOpenRSSB}) => {
  const getYear = useSelector((state) => state.getYear);
  const getCbhiNidDetails=useSelector((state)=>state.getCbhiNidDetails)
  const componentRef = useRef();
  const dispatch = useDispatch();
  const steps = [`Household NID`, `Make payment`, `View Payment`];
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
  const cbhiPayment = useSelector((state) => state.cbhiPayment);
  const [members,setMembers]=useState('');
  const [username,setUsername]=useState('')
  const [houseHoldNID,setHouseHoldNID]=useState('')
  const [payerName,setPayerName]=useState('');
  const [houseHoldCategory,seHouseHoldCategory]=useState('');
  const [householdMemberNumber,setHouseholdMemberNumber]=useState('');
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
 
  const history = useHistory();

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
      await dispatch(getYearAction());
      if (!getYear.loading) {
        if (getYear.years.return) {
          setYears(getYear.years.return);
        }
      }
       if(!getCbhiNidDetails.loading){
        if(getCbhiNidDetails.details.length!==0){
          if (getCbhiNidDetails.details.responsecode === 200) {
            await setMembers(getCbhiNidDetails.details.response.members);
            setHouseHoldNID(getCbhiNidDetails.details.response.headId)
            setPayerName(getCbhiNidDetails.details.response.headHouseHoldNames)
            seHouseHoldCategory(getCbhiNidDetails.details.response.houseHoldCategory)
            setHouseholdMemberNumber(getCbhiNidDetails.details.response.totalHouseHoldMembers)
            setTotalPremium(getCbhiNidDetails.details.response.totalAmount)
            handleNext();
           } else {
             return null;
           }
        }
        if(getCbhiNidDetails.error)  {
          setErrorMessage("Please Check your NID, and try again.");
        }
       }
  }
    fetchData();
  }, [!getYear.years.return,getCbhiNidDetails.details,getCbhiNidDetails.error]); 
  useEffect(()=>{
    async function fetchData(){
     if (!cbhiPayment.loading) {
       if (cbhiPayment.details.length !== 0) {
         if (cbhiPayment.details.responseCode === 200) {
          setTransactionId(cbhiPayment.details.transfersId)
          setDateTime(cbhiPayment.details.date)
          setTransactionStatus(cbhiPayment.details.status)
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
          members={members}
          totalPremium={totalPremium}
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
    setNIdErrorMessage("Household NID is required")
    setPaymentYearErrorMessage("Please select year")
    }
    else if(formData.nId==""){
      setNIdErrorMessage("Household NID is required")
    }
    else if(!Number(formData.nId)){
      setNIdErrorMessage("Household NID must be a number")
    }
    else if(formData.nId.length!==16){
      setNIdErrorMessage("Household NID must be 16 digit")
    }
    else if(formData.paymentYear==""){
      setPaymentYearErrorMessage("Please select year")
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
    }else{
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
    getCbhiNidDetails.error=['']
    setActiveStep(0);
    setOpenRSSB(false)

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
          RSSB Mutuelle Service
          </Typography>
           <img
                  src="../../../Assets/images/mutuelli.png"
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
                  <Typography variant="h5" gutterBottom>
                  Thank you for using Mobicash
                  </Typography>
                  <Typography variant="subtitle1">
                  You have successfully paid your Mutiweli year {formData.paymentYear}
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
               payerName={payerName}
               formData={formData}
               transactionId={transactionId}
               transactionStatus={transactionStatus}
               dateTime={dateTime}
               agentName={agentName}
               />
               </Box>
                </>
                        : activeStep === 0
                        ? getCbhiNidDetails.loading?
                        <Box sx={{ display: 'flex',justifyContent:"center" }}>
                        <CircularProgress  sx={{ color: 'orange'}} />
                         </Box>:"Submit"
                        : cbhiPayment.loading?
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

export default CbhiIdentificationForm;
