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
import { openAccountAction } from "../../../../redux/actions/openAccountAction";
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
import AuthContext from "../../../../context";
import { lazy } from "react";
const theme = createTheme();
const OpenAccountReceipt=lazy(()=>import("../receipt/OpenAccountReceipt").then(module=>{
  return {default: module.OpenAccountReceipt}
}))

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
  const componentRef = useRef();
  const steps = ['NID', 'Enter Information', 'View Details'];
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
    email:"",
    initialAmount:""
  });
const [errorMessage,setErrorMessage]=useState("");
const [open,setOpen]=React.useState(true);
const [firstName,setFirstName]=useState("")
const [lastName,setLastName]=useState("");
const [placeOfIssue,setPlaceOfIssue]=useState("");
const [gender,setGender]=useState("");
const [dateOfBirth,setDateOfBirth]=useState("")
const [photo,setPhoto]=useState("")

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
const [passwordError,setPasswordError]=useState("");
const [initialAmountError,setInitialAmountError]=useState("");
const [agentPhonenumber,setAgentPhonenumber]=useState("")
const { auth}=React.useContext(AuthContext)

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
         passwordError={ passwordError}
         openAccountError={openAccountError}
         setOpenAccountError={setOpenAccountError}
         phoneNumberError={phoneNumberError}
         emailError={emailError}
         initialAmountError={initialAmountError}
         />
       );
     case 2:
       return <Review 
       names={names}
       mobilePhone={mobilePhone}
       fullAccount={fullAccount}
       date={date}
       agentName={agentName}
       />;
     default:
       throw new Error("Unknown step");
   }
 };
 useEffect(() => {
  const token =sessionStorage.getItem('mobicash-auth');
  if (token) {
  const {name}=decode(token);
  setAgentName(name)
}
}, []);
 useEffect(()=>{
  async function fetchData(){
   if (!openAccount.loading) {
     if (openAccount.details.length !== 0) {
       if (openAccount.details.responseCode === 100) {
        setNames(openAccount.details.data.names)
        setFullAccount(openAccount.details.data.fullAccount.replace(/[^a-zA-Z0-9 ]/g, ''))
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

 //handle open account
 const handleOpenAccount=async()=>{
  const phoneNumber=formData.phoneNumber
  const telephone=formData.phoneNumber
  const initialamount=formData.initialAmount
  const password=formData.password
if(formData.initialAmount===""){
setInitialAmountError("Initial Amount is required")
}
   else if(formData.phoneNumber===""){
setPhoneNumberError("Phone number is required")
  }
  else if(!Number(formData.phoneNumber)){
    setPhoneNumberError("Phone number must be a numeric")
  }

  else if(formData.password===""){
    setPasswordError("Agent PIN is required")
      }
  else{
    setPhoneNumberError("")
    setEmailError("")
    setPasswordError("")
    setInitialAmountError("")
    
    let email=""
    if(formData.email===""){
     email="none";
    }else{
     email=formData.email
    }
    await dispatch(openAccountAction({
      documentNumber,
      initialamount,
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
        setUsername(auth.username)
        setBrokering(auth.brokering)
        setUserGroup(auth.usergroup)
        setAgentPhonenumber(auth.phonenumber)
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
  handleValidateNid();
 //handleNext()
   } else if (activeStep === 1) {
   // handleNext()
    handleOpenAccount()
   } else if (activeStep === 2) {
 handleNext()
   } else {
     return null;
   }
 };
 const handleNewpayment = () => {
  formData.nid = "";
  formData.password = "";
  formData.initialAmount="";
  validateNid.error=['']
  setNiderrorMessage("");
  validateNid.details=['']
  validateNid.loading=false
  formData.phoneNumber = "";
  formData.email = "";
  openAccount.error=['']
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
  formData.password = "";
  formData.initialAmount="";
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
        <Box m="10px"
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
              <Typography id="transition-modal-title" textAlign="center" variant="h6" component="h2">
    OPEN ACCOUNT
          </Typography>
          <CardMedia
                    component="img"
                    height="60"
                    image="../../images/gtbankImg.png"
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
                        ? <>
                        <ReactToPrint
             trigger={() => <Button> {t("common:receipt")}</Button>}
            content={() => componentRef.current}
               />
               <Box sx={{display:'none'}}>
               <OpenAccountReceipt
               ref={componentRef} 
               names={names}
               mobilePhone={mobilePhone}
               fullAccount={fullAccount}
               date={date}
               agentName={agentName}
               agentPhonenumber={agentPhonenumber}
               />
               </Box>
                </>
                        : activeStep === 0
                        ? validateNid.loading?
                        <Box sx={{ display: 'flex',justifyContent:"center" }}>
                        <CircularProgress  sx={{ color: 'orange'}} />
                         </Box>:`${t("common:submit")}`
                        :openAccount.loading?
                        <Box sx={{ display: 'flex',justifyContent:"center" }}>
                        <CircularProgress  sx={{ color: 'orange'}} />
                         </Box>:`Open Account`
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
