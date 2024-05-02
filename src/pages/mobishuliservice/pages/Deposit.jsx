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
import Document from "../components/deposit/Document";
import Account from "../components/deposit/Account";
import Review from "../components/deposit/Review";
import { openAccountAction } from "../../../redux/actions/openAccountAction";
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
import { valiateNidDetailsDetailsAction } from "../../../redux/actions/validateNidAction";
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

const Deposit= ({}) => {
  const { t } = useTranslation(["home","common","login","rra"]);
  const steps = ['Identification', 'Amount', 'View Details'];
  const [activeStep, setActiveStep] = React.useState(0);
  const dispatch = useDispatch();
const history=useHistory();
const validateNid=useSelector((state)=>state.validateNid);
const openAccount=useSelector((state)=>state.openAccount);
const [niderrorMessage,setNiderrorMessage]=useState("");
  const [formData, setFormData] = useState({
    nid: "",
    phoneNumber: "",
    password: "",
    email:""
  });
const [errorMessage,setErrorMessage]=useState("");
const [open,setOpen]=React.useState(true);
const [firstName,setFirstName]=useState("")
const [lastName,setLastName]=useState("");
const [placeOfIssue,setPlaceOfIssue]=useState("");
const [gender,setGender]=useState("");
const [dateOfBirth,setDateOfBirth]=useState("")
const [photo,setPhoto]=useState("")
const [password,setPassword]=useState("")
const [username,setUsername]=useState("");
const [brokering, setBrokering] = useState("");
const [userGroup, setUserGroup] = useState("");
const [agentName,setAgentName]=useState("");
const [openAccountError,setOpenAccountError]=useState("");

const [documentNumber,setDocumentNumber]=useState("")
const [nationality,setNationality]=useState("RW");
const [fatherNames,setFatherNames]=useState("");
const [motherNames,setMotherNames]=useState("");
//const [telephone,setTelephone]=useState("");
const [father,setFather]=useState("");
const [mother,setMother]=useState("");
const [idNumber,setIdNumber]=useState("");
// const [email,setEmail]=useState("");
//const [dateOfBirth,setDateOfBirth]=useState("");
const [accountType,setAccountType]=useState("");
const [branchName,setBranchName]=useState("");
const [civilStatus,setCivilStatus]=useState("");
const [spouse,setSpouse]=useState("");
const [dob,setDob]=useState("");
const [placeOfBirth,setPlaceOfBirth]=useState("");
const [countryOfBirth,setCountryOfBirth]=useState("");
const [dateOfIssue,setDateOfIssue]=useState("");
const [province,setProvince]=useState("");
const [district,setDistrict]=useState("");
const [sector,setSector]=useState("");
const [cell,setCell]=useState("");
const [village,setVillage]=useState("");

const [names,setNames]=useState("")
const [fullAccount,setFullAccount]=useState("");
const [mobilePhone,setMobilePhone]=useState("");
const [date,setDate]=useState("")

const [emailError,setEmailError]=useState("")
const [phoneNumberError,setPhoneNumberError]=useState("");
// const [phoneNumber,setPhoneNumber]=useState("")

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
         photo={photo}
         open={open}
         setOpen={setOpen}
         />
       );
     case 1:
       return (
         <Account
         formData={formData}
         setFormData={ setFormData}
         placeOfIssue={placeOfIssue}
         firstName={firstName}
         lastName={lastName}
         photo={photo}
         dateOfBirth={dateOfBirth}
         gender={gender}
         setOpen={setOpen}
         open={open}
         openAccountError={openAccountError}
         setOpenAccountError={setOpenAccountError}
         phoneNumberError={phoneNumberError}
         emailError={emailError}
         />
       );
     case 2:
       return <Review 
       names={names}
       mobilePhone={mobilePhone}
       fullAccount={fullAccount}
       date={date}
       />;
     default:
       throw new Error("Unknown step");
   }
 };
 useEffect(()=>{
  async function fetchData(){
   if (!openAccount.loading) {
     if (openAccount.details.length !== 0) {
       if (openAccount.details.responseCode === 100) {
        setNames(openAccount.details.data.names)
        setFullAccount(openAccount.details.data.fullAccount)
        setMobilePhone(openAccount.details.data.mobileNumber)
        setDate(openAccount.details.responseDate)
         handleNext();
       } else {
         return null;
       }
     }
     if (openAccount.error) {
       setOpenAccountError(openAccount.error);
     }
   }
  
  }
  fetchData();
   },[openAccount.details,openAccount.error])
  
 //agent infromation
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
  const {password}=decode(token);
  setUsername(username)
  setBrokering(role)
  setUserGroup(group)
  setAgentName(name)
  setPassword(password)
}
}, []);
 //handle open account
 const handleOpenAccount=async()=>{
  const phoneNumber=formData.phoneNumber
  const email=formData.email
  const telephone=formData.phoneNumber
  if(formData.phoneNumber===""){
setPhoneNumberError("Phone number is required")
  }
  else if(!Number(formData.phoneNumber)){
    setPhoneNumberError("Phone number must be a numeric")
  }
  else if(formData.email===""){
setEmailError("email is required")
  }
  else{
    setPhoneNumberError("")
    setEmailError("")
    await dispatch(openAccountAction({
      documentNumber,
      nationality,
      fatherNames,
      motherNames,
      telephone,
      firstName,
      lastName,
      father,
      mother,
      idNumber,
      phoneNumber,
      email,
      dateOfBirth,
      dob,
      accountType,
      branchName,
      gender,
      civilStatus,
      spouse:!spouse?"Some Woman":spouse,
      placeOfBirth,
      countryOfBirth,
      placeOfIssue,
      dateOfIssue,
      province,
      district,
      sector,
      cell,
      village,
      photo
    },username,password))
  }

 }
//render Nid details
useEffect(() => {
  async function fetchData() {
    if (!validateNid.loading) {
      if (validateNid.details.length !== 0) {
        if (validateNid.details.responseCode === 100) {
         setFirstName(validateNid.details.data.foreName)
         setLastName(validateNid.details.data.surnames)
         setDateOfBirth(validateNid.details.data.dateOfBirth)
         setPlaceOfIssue(validateNid.details.data.placeOfIssue)
         setPhoto(validateNid.details.data.photo)
         setGender(validateNid.details.data.sex)
         setDocumentNumber(validateNid.details.data.documentNumber);
        // setNationality(validateNid.details.data.nationality)
         setFatherNames(validateNid.details.data.fatherNames)
         setMotherNames(validateNid.details.data.motherNames)
        // setTelephone(formData.phoneNumber);
         setFather(validateNid.details.data.fatherNames);
         setMother(validateNid.details.data.motherNames);
         setIdNumber(formData.nid);
        // setEmail(formData.email);
         setDob(validateNid.details.data.dateOfBirth);
         setAccountType( "CURRENT")
         setBranchName("KIGALI")
         setCivilStatus(validateNid.details.data.civilStatus);
         setSpouse(validateNid.details.data.spouse);
         setPlaceOfBirth(validateNid.details.data.placeOfBirth);
         setCountryOfBirth(validateNid.details.data.countryOfBirth);
         setDateOfIssue(validateNid.details.data.dateOfIssue);
         setProvince(validateNid.details.data.province);
         setDistrict(validateNid.details.data.district);
         setSector(validateNid.details.data.sector);
         setCell(validateNid.details.data.cell);
         setVillage(validateNid.details.data.village);
        // setPhoneNumber(formData.phoneNumber);
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
  else if(!Number(formData.nid)){
    setNiderrorMessage("NID must be a numeric")
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
  if (openAccount.error) {
    setOpen(true);
  }
   if (activeStep === 0) {
 handleNext()
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
  formData.phoneNumber = "";
  formData.email = "";
  openAccount.error=['']
  // setNiderrorMessage("");
  openAccount.details=['']
  openAccount.loading=false
  setActiveStep(0)
 };

 const handleNext = () => {
   setActiveStep(activeStep + 1);
 };

 const handleBack = () => {
  formData.nid = "";
  formData.phoneNumber = "";
  formData.email = "";
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

   setOpenAccountError("");
  openAccount.error=['']
  // setNiderrorMessage("");
  openAccount.details=['']
  openAccount.loading=false
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
  Mobishuli Deposit Service
          </Typography>
          <CardMedia
                    component="img"
                    height="60"
                    image="../../images/mobishuli.png"
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
                  You have successfully pay school fees
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
                        :openAccount.loading?
                        <Box sx={{ display: 'flex',justifyContent:"center" }}>
                        <CircularProgress  sx={{ color: 'orange'}} />
                         </Box>:`Make Payment`
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

export default Deposit;
