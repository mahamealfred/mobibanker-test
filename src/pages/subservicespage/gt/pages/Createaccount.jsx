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
import Document from "../components/createaccount/Document";
import Account from "../components/createaccount/Account";
import Review from "../components/createaccount/Review";

import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { useHistory } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import jwt from "jsonwebtoken";

import ReactToPrint from 'react-to-print';
import { useRef } from 'react';
import { useTranslation } from "react-i18next";
import CardMedia from "@mui/material/CardMedia";
import { valiateNidDetailsDetailsAction } from "../../../../redux/actions/validateNidAction";
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

const RraForm = ({}) => {
  const { t } = useTranslation(["home","common","login","rra"]);
  const steps = ['NID', 'Enter Information', 'View Details'];
  const [activeStep, setActiveStep] = React.useState(0);
  const dispatch = useDispatch();
const history=useHistory();
const validateNid=useSelector((state)=>state.validateNid);
const [niderrorMessage,setNiderrorMessage]=useState("");
  const [formData, setFormData] = useState({
    nid: "",
    phoneNumber: "",
    password: "",
  });
const [errorMessage,setErrorMessage]=useState("");
const [open,setOpen]=React.useState(true);
const [firstName,setFirstName]=useState("")
const [lastName,setLastName]=useState("");
const [placeOfIssue,setPlaceOfIsue]=useState("");
const [gender,setGender]=useState("");
const [dateOfBirth,setDateOfBirth]=useState("")

 const getStepContent = (step) => {
   switch (step) {
     case 0:
       return (
         <Document
         formData={formData}
         setFormData={setFormData}
         errorMessage={errorMessage}
         setErrorMessage={setErrorMessage}
         niderrorMessage={niderrorMessage}
         open={open}
         setOpen={setOpen}
         />
       );
     case 1:
       return (
         <Account
         formData={formData}
         placeOfIssue={placeOfIssue}
         firstName={firstName}
         lastName={lastName}
         dateOfBirth={dateOfBirth}
         gender={gender}
        
         />
       );
     case 2:
       return <Review 
       />;
     default:
       throw new Error("Unknown step");
   }
 };
//render Nid details
useEffect(() => {
  async function fetchData() {
    if (!validateNid.loading) {
      if (validateNid.details.length !== 0) {
        if (validateNid.details.responseCode === 100) {
         setFirstName(validateNid.details.data.foreName)
         setLastName(validateNid.details.data.surnames)
         setDateOfBirth(validateNid.details.data.dateOfBirth)
         setPlaceOfIsue(validateNid.details.data.placeOfIssue)
         setGender(validateNid.details.data.sex)
          handleNext();
        } else {
          return null;
        }
      }
      if (validateNid.error) {
        setErrorMessage(validateNid.error);
      }
    }
  }
  fetchData();
}, [validateNid.details]);

 //handle validate NID
 const handleValidateNid=async()=>{
  if(formData.nid === ""){
    setNiderrorMessage("NID is required")
  }
  else{
    setNiderrorMessage("")
    const nid=formData.nid
    await dispatch(valiateNidDetailsDetailsAction({nid}))
  }
 }

 //handle on button submit for each step
 const handelSubmit = () => {
  if (validateNid.error) {
    setOpen(true);
  }
   if (activeStep === 0) {
   handleValidateNid();
  //handleNext()
   } else if (activeStep === 1) {
    handleNext()
   } else if (activeStep === 2) {

 handleNext()
   } else {
     return null;
   }

  
 };

 const handleNewpayment = () => {
  formData.nid = "";
 
  validateNid.error=['']
  setNiderrorMessage("");
  validateNid.details=['']
  validateNid.loading=false
  setActiveStep(0)
 };

 const handleNext = () => {
   setActiveStep(activeStep + 1);
 };

 const handleBack = () => {

  formData.nid = "";
  // formData.amount=""
  // formData.accountNumber=""
  // setAmountErr("");
  //setPasswordError("");
  // setAccountNumberErr("");
  setErrorMessage("");
  validateNid.error=['']
  setNiderrorMessage("");
  validateNid.details=['']
  validateNid.loading=false
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
    OPEN ACCOUNT
          </Typography>
          <CardMedia
                    component="img"
                    height="60"
                    image="../../images/gtbank.png"
                    alt="alt"
                    title="i"
                    sx={{  objectFit: "contain",
                    height:{xs:40,sm:40,md:60,lg:60}}}
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
                  You have successfully open a GT Bank Account
                  </Typography>
                
                  <Button onClick={handleNewpayment} sx={{ mt: 3, ml: 1 }}>
                Done
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
                        ? 'Receipt'
                        : activeStep === 0
                        ? validateNid.loading?
                        <Box sx={{ display: 'flex',justifyContent:"center" }}>
                        <CircularProgress  sx={{ color: 'orange'}} />
                         </Box>:`${t("common:submit")}`
                        :`Open Account`
                        }
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
