import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";

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
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, List, ListItem, ListItemText, MenuItem, Stack, TextField } from "@mui/material";
import { useHistory } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import { LoadingButton } from "@mui/lab";
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

const  ComponentToPrint=React.lazy(()=>import("./RiaComponentToPrint").then(module=>{
  return {default: module.ComponentToPrint}
}))

const identityTypes=[
  {
    name:"NID",
    value:"NID"
  },
  {
    name:"Passport",
    value:"Password"
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


  const SignupSchema = Yup.object().shape({
    identityType: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Identity Type required"),
    identityNumber: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Identity Number required"),
    email: Yup.string()
    .email("Email must be a valid email address")
    .required("Email is required"),
    firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("First Name required"),
    middleName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!"),
    lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Last Name required"),
    nationality: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Nationality required"),
    country: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Country required"),
    city: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("City required"),
    address: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Address required"),
    zipcode: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Zip Code  required"),
    documentId: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Please Upload your ID or Passport"),
    photo: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Photo  required"),

  });

  const formik = useFormik({
    initialValues: {
      identityType:"",
      identityNumber: "",
      email: "",
      firstName: "",
      middleName: "",
      lastName: "",
      nationality: "",
      country: "",
      city: "",
      address: "",
      zipcode: "",
      documentId: "",
      photo: "",
      // email: "",
     
    },
    validationSchema: SignupSchema,
    onSubmit: async(values) => {
      const username=values.username
      const password=values.password
    //  await dispatch(loginAction({username,password},navigate))
    // if (login.error) {
    //   setOpenErrorMessage(true)
    // }
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  const getElectricityDetails = useSelector((state) => state.getElectricityDetails);
  const electricityPayment = useSelector((state) => state.electricityPayment);
  const [formData, setFormData] = useState({
    orderNumber:"",
    orderPin:"",
    identityType:"",
    identityNumber:"",
    currentEmail:"",
  });
  const componentRef = useRef();

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

 const [identityTypeErr,setIdentityTypeErr]=useState("")
 const [identityNumberErr,setIdentityNumberErr]=useState("")
 const [currentEmailErr,setCurrentEmailErr]=useState("")

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
            currentEmailErr={currentEmailErr}
            paymenterrorMessage={paymenterrorMessage}
            setPaymenterrorMessage={setPaymenterrorMessage}
            openPayment={openPayment}
            setOpenPayment={setOpenPayment}
          />
        );
     case 2:
       return <Review 
      
       />;
     default:
       throw new Error("Unknown step");
   }
 };



 



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
   ordersList.map((n)=>{
    if((n.orderNumber==formData.orderNumber) && (n.orderPin==formData.orderPin) ){
      setOrdeNumber(n.orderNumber)
      setBeneFirstName(n.beneFirstName)
      setBeneLastName(n.beneLastName)
      setBeneMiddleName(n.beneMiddleName)
      setBeneNationality(n.beneNationality)
      setBeneEmailAddress(n.beneEmailAddress)
      setBeneCity(n.beneCity)
      setBeneCountry(n.beneCountry)
      setBeneZipCode(n.beneZipCode)
      setBeneAddress(n.beneAddress)
     setOpenOrderDetailsDialog(true)
     }else{
       setErrorMessage("Invalid Order PIN or Number")
     }
   } )
  
  }
 }

 //verify account
 const handleCheckBeneficiaryAccount=()=>{
  if(formData.identityType==""){
setIdentityTypeErr("Please select Identity Type")
  }
  else if(formData.identityNumber==""){
    setIdentityNumberErr("Identity Number is required")
  }else if (formData.currentEmail=="") {
    setCurrentEmailErr("Email Address is required")
  } else{
    setIdentityTypeErr("")
    setIdentityNumberErr("")
    setCurrentEmailErr("")
    ClientsData.map((n)=>{
      if((n.clientEmailAddress==formData.currentEmail)){
        handleNext()
     
       }else{
        setOpenClentRegistrationFormDetailsDialog(true)
       }
     } )
  }
 }



   const handleClose=()=>{
    setOpenDialog(false)
    setOpenOrderDetailsDialog(false)
    setOpenClentRegistrationFormDetailsDialog(false)
    setErrorMessage("")
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
 handleNext()
   } else {
     return null;
   }
  
   
  
  
 };

 const handleNewpayment = () => {
  formData.orderNumber = "";
  formData.orderPin = "";
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
<Dialog
        //fullScreen={fullScreen}
        fullWidth
        maxWidth="md"
        open={openClentRegistrationFormDetailsDialog}
       // onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Grid container direction="row" alignItems="center">
        <DialogTitle id="responsive-dialog-title" >
       Client Registration Form
        </DialogTitle>
         </Grid>
         <Divider color="warning"/>
        <DialogContent>
          <DialogContentText textAlign="center" >
          <Typography variant="h5" gutterBottom>
          Enter Client Information
      </Typography>

      
          <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
   
     <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
        <Stack spacing={4}>
        <Stack
         component="div"
         initial={{ opacity: 0, y: 60 }}
         animate={animate}
         direction={{ xs: "column", sm: "row" }}
         spacing={2}
       >
         <TextField
            fullWidth
            size="small"
            select
            autoComplete="identityType"
            name="identityType"
            value={formik.values.identityType}
            onChange={formik.handleChange}
            type="text"
            label="Select Identity Type"
            {...getFieldProps("username")}
            error={Boolean(touched.identityType && errors.identityType)}
            helperText={touched.identityType && errors.identityType}
         >
               {identityTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>{option.name}</MenuItem>
                    ))} 
         </TextField>
       </Stack>
       <Stack
         component="div"
         initial={{ opacity: 0, y: 60 }}
         animate={animate}
         direction={{ xs: "column", sm: "row" }}
         spacing={2}
       >
         <TextField
            fullWidth
            size="small"
            autoComplete="identityNumber"
            name="identityNumber"
            value={formik.values.identityNumber}
            onChange={formik.handleChange}
            type="text"
            label="Enter Identity Number"
            {...getFieldProps("identityNumber")}
            error={Boolean(touched.identityNumber && errors.identityNumber)}
            helperText={touched.identityNumber && errors.identityNumber}
         />
       </Stack>
       <Stack
         component="div"
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
            value={formik.values.email}
            onChange={formik.handleChange}
            type="email"
            label="Email"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
         />
       </Stack>
       <Stack
         component="div"
         initial={{ opacity: 0, y: 60 }}
         animate={animate}
         direction={{ xs: "column", sm: "row" }}
         spacing={2}
       >
         <TextField
            fullWidth
            size="small"
            autoComplete="firstName"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            type="text"
            label="First Name"
            {...getFieldProps("firstName")}
            error={Boolean(touched.firstName && errors.firstName)}
            helperText={touched.firstName && errors.firstName}
         />
       </Stack>
       <Stack
         component="div"
         initial={{ opacity: 0, y: 60 }}
         animate={animate}
         direction={{ xs: "column", sm: "row" }}
         spacing={2}
       >
         <TextField
            fullWidth
            size="small"
            autoComplete="middleName"
            name="middleName"
            value={formik.values.middleName}
            onChange={formik.handleChange}
            type="text"
            label="Middle Name"
            {...getFieldProps("middleName")}
            error={Boolean(touched.middleName && errors.middleName)}
            helperText={touched.middleName && errors.middleName}
         />
       </Stack>
       <Stack
         component="div"
         initial={{ opacity: 0, y: 60 }}
         animate={animate}
         direction={{ xs: "column", sm: "row" }}
         spacing={2}
       >
         <TextField
            fullWidth
            size="small"
            autoComplete="lastName"
            name="lastName"
            value={formik.values.last}
            onChange={formik.handleChange}
            type="text"
            label="Last Name"
            {...getFieldProps("lastName")}
            error={Boolean(touched.lastName && errors.lastName)}
            helperText={touched.lastName && errors.lastName}
         />
       </Stack>
       <Stack
         component="div"
         initial={{ opacity: 0, y: 60 }}
         animate={animate}
         direction={{ xs: "column", sm: "row" }}
         spacing={2}
       >
       </Stack>
     </Stack>

          {/* <Typography gutterBottom>{beneCountry}</Typography>
          <Typography gutterBottom>{beneCity+" "+beneState+" "+beneAddress}</Typography> */}
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
        <Stack spacing={4}>
        <Stack
         component="div"
         initial={{ opacity: 0, y: 60 }}
         animate={animate}
         direction={{ xs: "column", sm: "row" }}
         spacing={2}
       >
         <TextField
            fullWidth
            size="small"
            autoComplete="nationality"
            name="nationality"
            value={formik.values.nationality}
            onChange={formik.handleChange}
            type="text"
            label="Nationality"
            {...getFieldProps("nationality")}
            error={Boolean(touched.nationality && errors.nationality)}
            helperText={touched.nationality && errors.nationality}
         />
       </Stack>
       <Stack
         component="div"
         initial={{ opacity: 0, y: 60 }}
         animate={animate}
         direction={{ xs: "column", sm: "row" }}
         spacing={2}
       >
         <TextField
            fullWidth
            size="small"
            autoComplete="country"
            name="country"
            value={formik.values.country}
            onChange={formik.handleChange}
            type="text"
            label="Country"
            {...getFieldProps("country")}
            error={Boolean(touched.country && errors.country)}
            helperText={touched.country && errors.country}
         />
       </Stack>
       <Stack
         component="div"
         initial={{ opacity: 0, y: 60 }}
         animate={animate}
         direction={{ xs: "column", sm: "row" }}
         spacing={2}
       >
         <TextField
            fullWidth
            size="small"
            autoComplete="city"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            type="text"
            label="City"
            {...getFieldProps("city")}
            error={Boolean(touched.city && errors.city)}
            helperText={touched.city && errors.city}
         />
       </Stack>
        <Stack
         component="div"
         initial={{ opacity: 0, y: 60 }}
         animate={animate}
         direction={{ xs: "column", sm: "row" }}
         spacing={2}
       >
         <TextField
            fullWidth
            size="small"
            autoComplete="address"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            type="text"
            label="Address"
            {...getFieldProps("address")}
            error={Boolean(touched.address&& errors.address)}
            helperText={touched.address && errors.address}
         />
       </Stack>
       <Stack
         component="div"
         initial={{ opacity: 0, y: 60 }}
         animate={animate}
         direction={{ xs: "column", sm: "row" }}
         spacing={2}
       >
         <TextField
            fullWidth
            size="small"
            autoComplete="zipcode"
            name="zipcode"
            value={formik.values.zipcode}
            onChange={formik.handleChange}
            type="text"
            label="zipcode"
            {...getFieldProps("zipcode")}
            error={Boolean(touched.zipcode && errors.zipcode)}
            helperText={touched.zipcode && errors.zipcode}
         />
       </Stack>
       <Stack
         component="div"
         initial={{ opacity: 0, y: 60 }}
         animate={animate}
         direction={{ xs: "column", sm: "row" }}
         spacing={2}
       >
         <TextField
            fullWidth
            size="small"
            autoComplete="documentId"
            name="documentId"
            value={formik.values.documentId}
            onChange={formik.handleChange}
            type="file"
           
            {...getFieldProps("documentId")}
            error={Boolean(touched.documentId && errors.documentId)}
            helperText={touched.documentId && errors.documentId}
         />
           
       </Stack>
       <Typography>Please Uploade your Identity ID in pdf Format</Typography>
       <Stack
         component="div"
         initial={{ opacity: 0, y: 60 }}
         animate={animate}
         direction={{ xs: "column", sm: "row" }}
         spacing={2}
       >
      
         <TextField
            fullWidth
            size="small"
            autoComplete="photo"
            name="username"
            value={formik.values.photo}
            onChange={formik.handleChange}
            type="file"
            {...getFieldProps("photo")}
            error={Boolean(touched.photo && errors.photo)}
            helperText={touched.photo && errors.photo}
         />
        
       </Stack>
       <Typography>Please Uploade your PHOTO eg:png,jepg</Typography>
     
       <Stack
         component="div"
         initial={{ opacity: 0, y: 60 }}
         animate={animate}
         direction={{ xs: "column", sm: "row" }}
         spacing={2}
       >
       </Stack>
     </Stack>
        </Grid>
       
      </Grid>
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
                width:"sm"
                
            }}
            
        >
       <LoadingButton
              fullWidth
              size="large"
              style={{ borderRadius: 8,backgroundColor:"#000057" }}
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
 Register Beneficiary
            </LoadingButton>
        </Box>
     
      </Form>
    </FormikProvider>
          
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
           Address
          </Typography>
          <Typography gutterBottom>{beneCountry}</Typography>
          <Typography gutterBottom>{beneCity+" "+beneState+" "+beneAddress}</Typography>
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
                        ? "Next"
                        : activeStep === 0
                        ?
                        //  getElectricityDetails.loading?
                        // <Box sx={{ display: 'flex',justifyContent:"center" }}>
                        // <CircularProgress  sx={{ color: 'orange'}} />
                        //  </Box>:
                        "Submit"
                        : 
                        // <Box sx={{ display: 'flex',justifyContent:"center" }}>
                        // <CircularProgress  sx={{ color: 'orange'}} />
                        //  </Box>:
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
