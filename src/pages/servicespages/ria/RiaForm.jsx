import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider, Field, ErrorMessage, Formik } from "formik";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Document from "../../../components/services/ria/Document";
import Payment from "../../../components/services/ria/Payment";
import Review from "../../../components/services/ria/Review";
import CheckBeneficiaryAccount from "../../../components/services/ria/CheckBeneficiaryAccount";
import { getDocDetailsAction } from "../../../redux/actions/getDocDetailsAction";
import { rraPayamentAction } from "../../../redux/actions/rraPaymentAction";
import { getElectricityDetailsAction } from "../../../redux/actions/electricityAction";
import { electricityPayamentAction } from "../../../redux/actions/electricitPaymentAction";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, List, ListItem, ListItemText, MenuItem, Snackbar, Stack, TextField } from "@mui/material";
import { useHistory } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import { LoadingButton } from "@mui/lab";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import jwt from "jsonwebtoken";
// import { ComponentToPrint } from './ComponentToPrint';
import ReactToPrint from 'react-to-print';
import { useRef } from 'react';
import { useTranslation } from "react-i18next";
// import { motion } from "framer-motion";
import AuthContext from "../../../context";
import logo from "../../../assets/images/mobilogo.png"
import ClientsData from "../../../dummyData/ClientsData";
import ordersList from "../../../dummyData/ordersList";
import { Label } from "@mui/icons-material";
import { getRiaOrderDetailsAction } from "../../../redux/actions/getRiaOrderDetailsAction";
import { valiateNidDetailsDetailsAction } from "../../../redux/actions/validateNidAction";
import { clientValidationAction } from "../../../redux/actions/clientValidationAction";
import { motion } from "framer-motion/dist/framer-motion";
import { set } from "date-fns";
import { registerClientAction } from "../../../redux/actions/registerClientAction";
import { riaDepositAction } from "../../../redux/actions/riaDepositAction";

const  ComponentToPrint=React.lazy(()=>import("./RiaComponentToPrint").then(module=>{
  return {default: module.ComponentToPrint}
}))

const identityTypes=[
  {
    name:"National ID",
    value:"national_id"
  },
  {
    name:"Passport",
    value:"Passport"
  }
]
const theme = createTheme();
let easing = [0.6, -0.05, 0.01, 0.99];
const animate = {
  opacity: 1,
  y: 0,
  transition: {
    duration: 0.6,
    ease: easing,
    delay: 0.16,
  },
};
const StyledFormControlLabel = styled((props) => <FormControlLabel {...props} />)(
  ({ theme, checked }) => ({
    '.MuiFormControlLabel-label': checked && {
      color: theme.palette.primary.main,
    },
  }),
);
function MyFormControlLabel(props) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}
theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.4rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.6rem',
  },
};

const RiaForm = (props) => {
  const { i18n,t } = useTranslation(["home","common","login","rra"]);
  const steps = ["Check Order", "Check Beneficiary Account", "Details"];
  const [activeStep, setActiveStep] = React.useState(0);
  const dispatch = useDispatch();
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const SignupSchema = Yup.object().shape({
    // identityType: Yup.string()
    // .min(2, "Too Short!")
    // .max(50, "Too Long!")
    // .required("Identity Type required"),
    // identityNumber: Yup.string()
    // .min(2, "Too Short!")
    // .max(50, "Too Long!")
    // .required("Identity Number required"),
    email: Yup.string()
    .email("Email must be a valid email address")
    .required("Email is required"),
    phoneNumber:Yup.string()
      .required("Phone Number required")
      .matches(phoneRegExp, 'Phone number is not valid')
      .min(10, "too short")
      .max(13, "too long"),
    clientUsername: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Client Username required")
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      phoneNumber: "",
      clientUsername:""
    
    },
    validationSchema: SignupSchema,
   
    onSubmit: async(values) => {
      const clientUsername=values.clientUsername
      const email=values.email
      const phoneNumber=values.phoneNumber
      const identityType=values.identityType
      console.log("values:",values)
      // await dispatch(clientValidationAction({
      //   clientUsername,
      //   email,
      //   phoneNumber,
      //   identityType,
      //   nationality,
      //   firstName,
      //   lastName,
      //   idNumber,
      //   dateOfBirth,
      //   dob,
      //   gender,
      //   civilStatus,
      //   province,
      //   district,
      //   sector,
      //   cell,

      // },username,password))
    // if (login.error) {
    //   setOpenErrorMessage(true)
    // }
    },
  });


  //formik 
  const initialValues = {
  email: "",
  password: ""
};


  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, isValid, dirty } = formik;


  const getElectricityDetails = useSelector((state) => state.getElectricityDetails);
  const electricityPayment = useSelector((state) => state.electricityPayment);
  const getRiaOrderDetails=useSelector((state)=>state.getRiaOrderDetails)
  const registerClient=useSelector((state)=>state.registerClient)
  const riaDeposit=useSelector((state)=>state.riaDeposit)
  const [formData, setFormData] = useState({
    orderNumber:"",
    orderPin:"",
    identityType:"",
    identityNumber:"",
    currentEmail:"",
    benePhoneNumber:""
  });
  const componentRef = useRef();
const [openSnackbar,setOpenSnackbar]=useState(false)
 //rra get details
 const [meterNumberErr, setMeterNumberErr] = useState("");
 const [errorMessage, setErrorMessage] = useState("");
 //rra payments
 const [paymenterrorMessage, setPaymenterrorMessage] = useState("");
 const [phoneNumberError, setPhoneNumberError] = useState("");
 const [passwordError, setPasswordError] = useState("");

 const [rraRef, setRraRef] = useState("");
 const [tin, setTin] = useState("");


 const [openPayment,setOpenPayment]=useState(true);
 const [tokenValue,setTokenValue]=useState("");
 const [amountPaid,setAmountPaid]=useState("")
 const [password,setPassword]=useState("")
 //ria
 const [orderNumberErr,setOrderNumberErr]=useState("")
 const [orderPinErr,setOrderPinErr]=useState("")
 const [openOrderDetailsDialog,setOpenOrderDetailsDialog]=useState(false);

 const [orderNumber,setOrdeNumber]=useState("")
 const [orderPin,setOrderPin]=useState("")
 const [beneFirstName,setBeneFirstName]=useState("")
 const [beneMiddleName,setBeneMiddleName]=useState("")
 const [beneLastName,setBeneLastName]=useState("")
 const [beneNationality,setBeneNationality]=useState("")
 const [beneCountry,setBeneCountry]=useState("")
 const [beneCity,setBeneCity]=useState("")
 const [beneState,setBeneState]=useState("")
 const [beneZipCode,setBeneZipCode]=useState("")
 const [beneEmailAddress,setBeneEmailAddress]=useState("")
 const [beneAddress,setBeneAddress]=useState("")
const  [openClentRegistrationFormDetailsDialog,setOpenClentRegistrationFormDetailsDialog]=useState(false)
const [orderDate,setOrderDate]=useState("")
const [orderStatus,setOrderStatus]=useState("")
const [beneAmount,setBeneAmount]=useState("")
const [beneCurrency,setBeneCurrency]=useState("")

 const [identityTypeErr,setIdentityTypeErr]=useState("")
 const [identityNumberErr,setIdentityNumberErr]=useState("")
 const [benePhoneNumberErr,setBenePhoneNumberErr]=useState("")

 const validateNid=useSelector((state)=>state.validateNid);
 const clientValidation=useSelector((state)=>state.clientValidation);
const [niderrorMessage,setNiderrorMessage]=useState("");
const [email, setEmail] = useState('')
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
const [firstName,setFirstName]=useState("")
const [lastName,setLastName]=useState("");
const [placeOfIssue,setPlaceOfIssue]=useState("");
const [gender,setGender]=useState("");
const [dateOfBirth,setDateOfBirth]=useState("")
const [photo,setPhoto]=useState("")
const [names,setNames]=useState("")

const [identityType,setIdentityType]=useState("")
const [identityNumber,setIdentityNumber]=useState("")
const [nidErrorMessage,setNidErrorMessage ]=useState("")


 //all
 const { auth }=React.useContext(AuthContext)
 const [open, setOpen] = React.useState(true);
 const [docDetails, setDocDetails] = useState("");
 const [openDialog,setOpenDialog]=useState(false);
 const [executing, setExecuting] = useState(false);
 const [username,setUsername]=useState("");

 const [clientName,setClientName]=useState("")
 const [clientPhoneNumber,setClientPhoneNumber]=useState("");
 const [clientEmail,setClientEmail]=useState("")
 

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
           orderNumberErr={orderNumberErr}
           orderPinErr={orderPinErr}
           errorMessage={errorMessage}
           setErrorMessage={setErrorMessage}
           open={open}
           setOpen={setOpen}
         />
       );
       case 1:
        return (
          <CheckBeneficiaryAccount
            formData={formData}
            setFormData={setFormData}
            identityNumberErr={identityNumberErr}
            identityTypeErr={identityTypeErr}
            benePhoneNumberErr={benePhoneNumberErr}
            paymenterrorMessage={paymenterrorMessage}
            setPaymenterrorMessage={setPaymenterrorMessage}
            openPayment={openPayment}
            setOpenPayment={setOpenPayment}
          />
        );
     case 2:
       return <Review 
      clientEmail={clientEmail}
      clientPhoneNumber={clientPhoneNumber}
      clientName={clientName}
      depositErrorMessage={depositErrorMessage}
      setDepositErrorMessage={setDepositErrorMessage}
      openPayment={openPayment}
      setOpenPayment={setOpenPayment}
       />;
     default:
       throw new Error("Unknown step");
   }
 };


const handleCloseNidErrMessage=()=>{
  setNidErrorMessage("")
  setRegisterClientErrorMessage("")
  setOpenErrorMessage(false)
}
 
const [clientUsername,setClientUsername]=useState("")
const [phoneNumber,setPhoneNumber]=useState("");
const [openErrorMessage,setOpenErrorMessage]=useState(false)
const [registerClientErrorMessage,setRegisterClientErrorMessage]=useState("")
const [depositErrorMessage, setDepositErrorMessage]=useState("")
const [orderPIN,setOrderPIN]=useState("")

//handle ria deposit
const handleRiaDeposit=async()=>{
  const orderNo=orderNumber
  const PIN=orderPIN
  const clientaccount=clientPhoneNumber
  await dispatch(riaDepositAction({clientaccount,PIN,orderNo},username,password))
  if (riaDeposit.error) {
    setDepositErrorMessage(riaDeposit.error)
  
    setOpenPayment(true)
  }
}
useEffect(() => {
  async function fetchData() {
     if(!riaDeposit.loading){
      if(riaDeposit.details.length!==0){
        if (riaDeposit.details.responseCode === 100) {
          
        handleNext()
        // setOpenOrderDetailsDialog(true)
         } else {
           return null;
         }
      }
      if(riaDeposit.error)  {
        setDepositErrorMessage(riaDeposit.error);
      }
     }
}
  fetchData();
}, [riaDeposit.details,riaDeposit.error]); 


//handle submit 
const handleSubmitForm=async()=>{
  
   await dispatch(registerClientAction({
        clientUsername,
        email,
        phoneNumber,
        identityType,
        nationality,
        firstName,
        lastName,
        idNumber,
        dateOfBirth,
        dob,
        gender,
        civilStatus,
        province,
        district,
        sector,
        cell,

      },username,password))
    if (registerClient.error) {
      setRegisterClientErrorMessage(registerClient.error)
      setOpenErrorMessage(true)
    }
}

// fect client registaration 
useEffect(() => {
  async function fetchData() {
     if(!registerClient.loading){
      if(registerClient.details.length!==0){
        if (registerClient.details.responseCode === 100) {
          
          setOpenClentRegistrationFormDetailsDialog(false)
          setOpenSnackbar(true)
    
        // setOpenOrderDetailsDialog(true)
         } else {
           return null;
         }
      }
      if(registerClient.error)  {
        setRegisterClientErrorMessage(registerClient.error);
      }
     }
}
  fetchData();
}, [registerClient.details,registerClient.error]); 

// handle order details
 const handleOrderDetails=async()=>{
  if (formData.orderNumber === "") {
    setOrderNumberErr("Order number is required")
  } else if (!Number(formData.orderNumber)) {
    setOrderNumberErr("Order number must be numeric")
  } 
  else if (!Number(formData.orderPin)) {
    setOrderPinErr("Order  PIN is required")
  } 
  else {
   setOrderNumberErr("")
   setOrderPinErr("")
   const orderNum=formData.orderNumber
   const orderPin=formData.orderPin
await dispatch(getRiaOrderDetailsAction({orderNum,orderPin}))
  
  }
 }

 //verify account
 const handleCheckBeneficiaryAccount=async()=>{

if (formData.benePhoneNumber=="") {
    setBenePhoneNumberErr("Phone Number is required")
  } 
  else{
    setBenePhoneNumberErr("")
    const benePhone=formData.benePhoneNumber
    await dispatch(clientValidationAction({benePhone},auth))
 
  }
 }

//fetch order details
useEffect(() => {
  async function fetchData() {
     if(!getRiaOrderDetails.loading){
      if(getRiaOrderDetails.details.length!==0){
        if (getRiaOrderDetails.details.responseCode === 100) {

          setOrdeNumber(getRiaOrderDetails.details.data.Transaction.OrderNo)
          setOrderDate(getRiaOrderDetails.details.data.Transaction.OrderDate)
          setOrderStatus(getRiaOrderDetails.details.data.Transaction.OrderStatus)
          setOrderPIN(getRiaOrderDetails.details.data.Transaction.PIN)
          setBeneFirstName(getRiaOrderDetails.details.data.Beneficiary.PersonalInformation.BeneFirstName)
          setBeneLastName(getRiaOrderDetails.details.data.Beneficiary.PersonalInformation.BeneLastName)
          setBeneMiddleName(getRiaOrderDetails.details.data.Beneficiary.PersonalInformation.BeneMiddleName)
          setBeneNationality(getRiaOrderDetails.details.data.Beneficiary.PersonalInformation.BeneNationality)
          setBeneEmailAddress(getRiaOrderDetails.details.data.Beneficiary.ContactDetails.BeneEmailAddress)
          setBeneCity(getRiaOrderDetails.details.data.Beneficiary.Residence.BeneCity)
          setBeneCountry(getRiaOrderDetails.details.data.Beneficiary.Residence.BeneCountry)
          setBeneZipCode(getRiaOrderDetails.details.data.Beneficiary.Residence.BeneZipCode)
          setBeneAddress(getRiaOrderDetails.details.data.Beneficiary.Residence.BeneAddress)
          setBeneAmount(getRiaOrderDetails.details.data.Quotation.BeneAmount)
          setBeneCurrency(getRiaOrderDetails.details.data.Quotation.BeneCurrency)
          setBeneState(getRiaOrderDetails.details.data.Beneficiary.Residence.BeneState)
         setOpenOrderDetailsDialog(true)
         } else {
           return null;
         }
      }
      if(getRiaOrderDetails.error)  {
        setErrorMessage(getRiaOrderDetails.error);
      }
     }
}
  fetchData();
}, [getRiaOrderDetails.details,getRiaOrderDetails.error]); 
//chech client validation
useEffect(() => {
  async function fetchData() {
    if (!clientValidation.loading) {
      if (clientValidation.details.length !== 0) {
        if (clientValidation.details.responseCode === 100) {
          setClientEmail(clientValidation.details.data.email)
          setClientName(clientValidation.details.data.names)
          setClientPhoneNumber(clientValidation.details.data.phoneNumber)
          handleNext();
        } 
       
        else {
       
          return null;
        }
      }
      if (clientValidation.error) {
        setOpenClentRegistrationFormDetailsDialog(true)
        setErrorMessage(clientValidation.error);
      }
    }
  }
  fetchData();
}, [clientValidation.details]);
//validate NID 
const handleSubmitNid=async()=>{
 if(identityNumber==""){
    setIdentityNumberErr("Identity Number is required")
  }
  else{
    setIdentityNumberErr("")
    let nid=identityNumber
await dispatch(valiateNidDetailsDetailsAction({nid}))
  }
}
//fectch identity id details
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
         setDocumentNumber(validateNid.details.data.applicationNumber);
        // setNationality(validateNid.details.data.nationality)
         setFatherNames(validateNid.details.data.fatherNames)
         setMotherNames(validateNid.details.data.motherNames)
        // setTelephone(formData.phoneNumber);
         setFather(validateNid.details.data.fatherNames);
         setMother(validateNid.details.data.motherNames);
         setIdNumber(identityNumber);
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
        setPassword(auth.password)
         setUsername(auth.phonenumber)
        // setBrokering(auth.brokering)
        // setUserGroup(auth.usergroup)
        // setAgentPhonenumber(auth.phonenumber)
         // handleNext();
        } 
       
        else {
       
          return null;
        }
      }
      if (validateNid.error) {
       
        setNidErrorMessage (validateNid.error);
      }
    }
  }
  fetchData();
}, [validateNid.details]);

   const handleClose=()=>{
    setOpenSnackbar(false)
    setOpenDialog(false)
    setOpenOrderDetailsDialog(false)
    setOpenClentRegistrationFormDetailsDialog(false)
    setErrorMessage("")
    setNidErrorMessage("")
    setOpen(false)
   }
 //handle on button submit for each step
 const handelSubmit = () => {
   if (activeStep === 0) {
  handleOrderDetails()
    // handleNext()
   } else if (activeStep === 1) {
    //handleElectricityPayment();
    handleCheckBeneficiaryAccount()
    // handleNext();
   } else if (activeStep === 2) {
handleRiaDeposit()
   } else {
     return null;
   }
  
   
  
  
 };

 const handleNewpayment = () => {
  formData.orderNumber = "";
  formData.orderPin = "";
  formData.benePhoneNumber=""
  setErrorMessage("")
  setActiveStep(0)
 };

 const handleNext = () => {
  setOpenOrderDetailsDialog(false)
   setActiveStep(activeStep + 1);
 };

 const handleBack = () => {
   formData.orderNumber = "";
   formData.orderPin=""
   formData.benePhoneNumber=""
   setOrderPinErr("")
   setOrderNumberErr("")
   setErrorMessage("");
   setPaymenterrorMessage("");
   setActiveStep(0);
   history.push("/dashboard",{push:true})
 };

  return (
    <div>
      <ThemeProvider theme={theme}>
        {/* <CssBaseline /> */}
{/* client registration form */}
<Snackbar open={openSnackbar} autoHideDuration={9000} onClose={handleClose}>
  <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
  You successfully finished the registration process.
We have sent an email with a confirmation link to your email address
  </Alert>
</Snackbar>
<Dialog
        //fullScreen={fullScreen}
        fullWidth
        maxWidth="md"
        open={openClentRegistrationFormDetailsDialog}
       // onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Grid container direction="row" alignItems="center">
          
        <DialogTitle id="responsive-dialog-title"  sx={{ textAlign:"center" }}>
        Client Registration Form
        </DialogTitle>
         </Grid>
         <Divider color="warning"/>
        <DialogContent>
          <DialogContentText textAlign="center" >
{
          !nidErrorMessage ? null : (
                <Collapse in={open}>
                    <Alert severity="error"
                        action={
                            <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"onClick={handleCloseNidErrMessage}>
                        <CloseIcon
                        fontSize="inherit"/></IconButton>
                        }
                        sx={
                            {mb: 0.2}
                    }>
                        {/* {errorMessage==="System unit not active. (6013) - 8/2214"?`${t("electricity:invalidmeternumber")}`:errorMessage}  */}
                        {nidErrorMessage} 
                        </Alert>
                </Collapse>
            )
        }
          <React.Fragment>
        
            <Grid item
                    xs={12}>
                <TextField
                   size="small"
                   type="text"
                   variant='outlined'
                   select
                   color='secondary'
                   label="Select Identity Type"
                   fullWidth
                   onChange={e => setIdentityType(e.target.value)}
                   value={identityType}
                   required
                   sx={{mb: 4, maxWidth: "500px" }}
                >
                         {identityTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>{option.name}</MenuItem>
                    ))} 
                  </TextField>
                      </Grid>
               
                  {
                    identityType=="national_id"?
                   
                <>
                 <Grid item
                    xs={12}>
             <TextField
                 size="small"
                    type="text"
                    variant='outlined'
                    color='secondary'
                    label="Identity Number"
                    fullWidth
                    onChange={e => setIdentityNumber(e.target.value)}
                    value={identityNumber}
                    required
                    sx={{mb: 4, maxWidth: "500px" }}
                   
                />
                 
                    </Grid>
                {
                  validateNid.details.data?
                 null
                  :  validateNid.loading?
                  <Box sx={{ display: 'flex',justifyContent:"center" }}>
                  <CircularProgress  sx={{ color: 'orange'}} />
                   </Box>:
<Button variant="text" onClick={handleSubmitNid} color="primary" type="submit">Submit</Button>
                }
                </>
                    :null
                  }
              
              
                
          
        </React.Fragment>
          {/* <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}> */}
        {
          validateNid.details.data?
          <>
          {/* <Typography variant="h6" gutterBottom>
          Client Information
      </Typography> */}
      {/* <Grid direction="column" xs={12} sm={6}>
        <Grid item xs={12} sm={6}> */}
        <List disablePadding>
        {
          !registerClientErrorMessage ? null : (
                <Collapse in={openErrorMessage}>
                    <Alert severity="error"
                        action={
                            <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"onClick={handleCloseNidErrMessage}>
                        <CloseIcon
                        fontSize="inherit"/></IconButton>
                        }
                        sx={
                            {mb: 0.2}
                    }>
                        {/* {errorMessage==="System unit not active. (6013) - 8/2214"?`${t("electricity:invalidmeternumber")}`:errorMessage}  */}
                        {registerClientErrorMessage} 
                        </Alert>
                </Collapse>
            )
        }
          <ListItem  sx={{ py: 1, px: {xs:0,sm:20} }}>
            <ListItemText primary="First Name" />
            <Typography variant="body2">{firstName}</Typography>
          </ListItem>
          <ListItem  sx={{ py: 1, px: {xs:0,sm:20} }}>
            <ListItemText primary=" Last Name" />
            <Typography variant="body2">{lastName}</Typography>
          </ListItem>
          <ListItem  sx={{ py: 1, px: {xs:0,sm:20} }}>
            <ListItemText primary="Place of Issue" />
            <Typography variant="body2">{placeOfIssue}</Typography>
          </ListItem>
          <ListItem  sx={{ py: 1, px: {xs:0,sm:20} }}>
            <ListItemText primary="Marital Status" />
            <Typography variant="body2">{civilStatus}</Typography>
          </ListItem>
        {/* <ListItem sx={{ py: 1, px: {xs:0,sm:20} }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $34.06
          </Typography>
        </ListItem> */}
      </List>
          </>:null
        }
     <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
        <Stack spacing={4}>
      
       {
         validateNid.details.data?
        <>
           <Stack
       component={motion.div}
         initial={{ opacity: 0, y: 60 }}
         animate={animate}
         direction={{ xs: "column", sm: "row" }}
         spacing={2}
       >
         <TextField
            fullWidth
            size="small"
            autoComplete="email"
            name="email"
            // value={formik.values.email}
            // onChange={formik.handleChange}
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            type="email"
            label="Email"
            // {...getFieldProps("email")}
            // error={Boolean(touched.email && errors.email)}
            // helperText={touched.email && errors.email}
         />
       </Stack>
   
       <Stack
        component={motion.div}
         initial={{ opacity: 0, y: 60 }}
         animate={animate}
         direction={{ xs: "column", sm: "row" }}
         spacing={2}
       >
         <TextField
            fullWidth
            size="small"
            autoComplete="clientUsername"
            name="clientUsername"
            // value={formik.values.clientUsername}
            // onChange={formik.handleChange}
            value={clientUsername}
            onChange={(e)=>setClientUsername(e.target.value)}
            type="text"
            label="Client Username"
            // {...getFieldProps("clientUsername")}
            // error={Boolean(touched.clientUsername && errors.clientUsername)}
            // helperText={touched.clientUsername && errors.clientUsername}
         />
       </Stack>
       <Stack
        component={motion.div}
         initial={{ opacity: 0, y: 60 }}
         animate={animate}
         direction={{ xs: "column", sm: "row" }}
         spacing={2}
       >
       
       </Stack>
        </>
        :null
       }
      
     </Stack>

          {/* <Typography gutterBottom>{beneCountry}</Typography>
          <Typography gutterBottom>{beneCity+" "+beneState+" "+beneAddress}</Typography> */}
        </Grid>
        {
        validateNid.details.data?
        <Grid item container direction="column" xs={12} sm={6}>
        <Stack spacing={4}>
       <Stack
       component={motion.div}
         initial={{ opacity: 0, y: 60 }}
         animate={animate}
         direction={{ xs: "column", sm: "row" }}
         spacing={2}
       >
         <TextField
            fullWidth
            size="small"
            autoComplete="phoneNumber"
            name="phoneNumber"
            // value={formik.values.phoneNumber}
            // onChange={formik.handleChange}
            value={phoneNumber}
            onChange={(e)=>setPhoneNumber(e.target.value)}
            type="text"
            label="Phone Number"
            // {...getFieldProps("phoneNumber")}
            // error={Boolean(touched.phoneNumber && errors.phoneNumber)}
            // helperText={touched.phoneNumber && errors.phoneNumber}
         />
       </Stack>
       <Stack
         component={motion.div}
         initial={{ opacity: 0, y: 60 }}
         animate={animate}
         direction={{ xs: "column", sm: "row" }}
         spacing={2}
       >
       </Stack>
     </Stack>
        </Grid>
        :null
        }    
      </Grid>
      {
          validateNid.details.data?
          <Box
          component="div"
          initial={{ opacity: 0, y: 20 }}
          animate={animate}
         //  maxWidth="sm"
               sx={{
                   display: 'flex',
                   justifyContent: 'center',
                   alignItems: 'center',
                   flexDirection: 'column',
                   width:"sm",
               }}
               
           >
             
          {/* <LoadingButton
                 fullWidth
                 component={motion.div}
                 size="large"
                 style={{ borderRadius: 8,backgroundColor:"#000057" }}
                 type="submit"
                 variant="contained"
                 loading={isSubmitting}
                 // onClick={handleSubmitForm}
               >
            Register Beneficiary
               </LoadingButton>  */}
               {
                registerClient.loading? <Box sx={{ display: 'flex',justifyContent:"center" }}>
                <CircularProgress  sx={{ color: 'orange'}} />
                 </Box>:
                 <Button
                 fullWidth
                 component={motion.div}
                 size="large"
                 style={{ borderRadius: 8,backgroundColor:"#000057" }}
                 type="submit"
                 variant="contained"
          
                 onClick={handleSubmitForm}
               >
            Register Client
               </Button> 
               }
                
               </Box>
          :null
          }
      
      {/* </Form>
    </FormikProvider> */}
 
          
          {/* <Typography gutterBottom>{beneCountry}</Typography>
          <Typography gutterBottom>{beneCity+" "+beneState+" "+beneAddress}</Typography> */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
         Cancel
          </Button>
          {/* <Button
            disabled={executing || disabled}
            {...otherProps}
          // onClick={handleNext} 
          autoFocus>
        Submit
          </Button> */}
        </DialogActions>
      </Dialog>

        {/* order iformation */}
        <Dialog
        //fullScreen={fullScreen}
        fullWidth
        maxWidth="md"
        open={openOrderDetailsDialog}
       // onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Grid container direction="row" alignItems="center">
        <DialogTitle id="responsive-dialog-title" >
       Order Details
        </DialogTitle>
         </Grid>
         <Divider color="warning"/>
        <DialogContent>
          <DialogContentText textAlign="center" >
          <Typography variant="h6" gutterBottom>
          Beneficiary Information
      </Typography>
      {/* <Grid direction="column" xs={12} sm={6}>
        <Grid item xs={12} sm={6}> */}
        <List disablePadding>
     
          <ListItem  sx={{ py: 1, px: {xs:0,sm:20} }}>
            <ListItemText primary="First Name" />
            <Typography variant="body2">{beneFirstName}</Typography>
          </ListItem>
          <ListItem  sx={{ py: 1, px: {xs:0,sm:20} }}>
            <ListItemText primary=" Middle Name" />
            <Typography variant="body2">{beneMiddleName}</Typography>
          </ListItem>
          <ListItem  sx={{ py: 1, px: {xs:0,sm:20} }}>
            <ListItemText primary=" Last Name" />
            <Typography variant="body2">{beneLastName}</Typography>
          </ListItem>
          <ListItem  sx={{ py: 1, px: {xs:0,sm:20} }}>
            <ListItemText primary=" Email Address" />
            <Typography variant="body2">{beneEmailAddress}</Typography>
          </ListItem>
        {/* <ListItem sx={{ py: 1, px: {xs:0,sm:20} }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $34.06
          </Typography>
        </ListItem> */}
      </List>
{/* </Grid>
      </Grid>
      */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Beneficiary Address
          </Typography>
          <Typography gutterBottom>{beneCountry}</Typography>
          <Typography gutterBottom>{beneCity+", "+beneState+", "+beneAddress}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Order summary
          </Typography>
          <Grid container>
     
              <React.Fragment >
                <Grid item xs={6}>
                  <Typography gutterBottom>Order Number</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{orderNumber}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Date</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{orderDate}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Currency</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{beneCurrency}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Beneficiary Amount</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{beneAmount}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>Order Status</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{orderStatus}</Typography>
                </Grid>
              </React.Fragment>
        
          </Grid>
        </Grid>
      </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
         Cancel
          </Button>
          <Button
            disabled={executing || disabled}
            {...otherProps}
          onClick={handleNext} autoFocus>
        Next
          </Button>
        </DialogActions>
      </Dialog>



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
           autoFocus>
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
         RIA Service
          </Typography>
           <img
                  src="../../../images/ria.jpg"
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
                  Please, Go to the previous transaction to approve the withdrawal amount.
                  </Typography>
                  <Button onClick={handleNewpayment} sx={{ mt: 3, ml: 1 }}>
                  Go Back To Home
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
                        ? riaDeposit.loading?
                        <Box sx={{ display: 'flex',justifyContent:"center" }}>
                        <CircularProgress  sx={{ color: 'orange'}} />
                         </Box>:"Next"
                        : activeStep === 0
                        ?
                        getRiaOrderDetails.loading?
                        <Box sx={{ display: 'flex',justifyContent:"center" }}>
                        <CircularProgress  sx={{ color: 'orange'}} />
                         </Box>:
                        "Submit"
                        : clientValidation.loading?
                        <Box sx={{ display: 'flex',justifyContent:"center" }}>
                        <CircularProgress  sx={{ color: 'orange'}} />
                         </Box>:

                        "Verifiey Account"}
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

export default RiaForm;
