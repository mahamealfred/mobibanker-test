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
import Document from "../../../components/services/cbhi/Document";
import Payment from "../../../components/services/cbhi/Payment";
import Review from "../../../components/services/cbhi/Review";
import { useState,useEffect } from "react";
import { getYearAction } from "../../../redux/actions/getYearAction";
import { getCbhiNidDetailsAction } from "../../../redux/actions/getCbhiNidDetailsAction";
import { useDispatch,useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { useHistory } from "react-router-dom";
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



const CbhiIdentificationForm = () => {
  const getYear = useSelector((state) => state.getYear);
  const getCbhiNidDetails=useSelector((state)=>state.getCbhiNidDetails)
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
             //cbhi payment
  const cbhiPayment = useSelector((state) => state.cbhiPayment);
  const [members,setMembers]=useState('');
  const [username,setUsername]=useState('')
  const [agentCategory,setAgentCategory]=useState('');
  const [houseHoldNID,setHouseHoldNID]=useState('')
  const [paymentYear,setPaymentYear]=useState('')
  const [amountPaid,setAmountPaid]=useState('');
  const [password,setPassword]=useState('');
  const [payerPhoneNumber,setPayerPhoneNumber]=useState('')   
  const [payerName,setPayerName]=useState('');
  const [houseHoldCategory,seHouseHoldCategory]=useState('');
  const [householdMemberNumber,setHouseholdMemberNumber]=useState('');
  const [totalPremium,setTotalPremium]=useState('');  
  //cbhi payment
  const [phoneNumberError,setPhoneNumberError]=useState('')
  const [amountPaidError,setAmountPaidError]=useState('');
  const [passwordError,setPasswordError]=useState('');
  const [paymentErrorMessage,setPaymentErrorMessage]=useState('');
  console.log("result::",
  payerName,
  houseHoldCategory,
  members,
  householdMemberNumber,
  totalPremium
  )
  const history = useHistory();
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
            //await setHeadIdDetails(getCbhiNidDetails.details);
            await setMembers(getCbhiNidDetails.details.response.members);
            setHouseHoldNID(getCbhiNidDetails.details.response.headId)
            //setPaymentYear(year[0])
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
          />
        );
      case 2:
        return <Review 
       
        
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
      console.log("success....")
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
  };

  const handleNewpayment = () => {
   setActiveStep(0)
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
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
                  You have successfully paid your Mutuwelli 2022
                  </Typography>
                
                  <Button onClick={handleNewpayment} sx={{ mt: 3, ml: 1 }}>
                  New Payament
                  </Button>
                  
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    {activeStep !== 0 && activeStep !==2? (
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
                        ? `Submit`
                        : "Make Payment"}
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
