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
  const dispach = useDispatch();
  const steps = [`Household NID`, `Make payment`, `View Payment`];
  const [activeStep, setActiveStep] = React.useState(0);

  const [years, setYears] = React.useState([]);
  const [nIdErrorMessage,setNIdErrorMessage]=useState("");
  const [paymentYearErrorMessage,setPaymentYearErrorMessage]=useState("")
  
  const [formData, setFormData] = useState({
    docId: "",
    phoneNumber: "",
    password: "",
  });
  

  const history = useHistory();
  useEffect(() => {
    async function fetchData() {
      await dispach(getYearAction());
      if (!getYear.loading) {
        if (getYear.years.return) {
          setYears(getYear.years.return);
        }
      }
       if(!getCbhiNidDetails.loading){
        if(getCbhiNidDetails.details.length!==0){
          //setHeadIdDetails(getNidDetails.details)
         // headIdDetails.push(getCbhiNidDetails.details)
         return null
        }
       }
  }
    fetchData();
  }, [!getYear.years.return]); 

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Document
          formData={formData}
          setFormData={setFormData}
          years={years}
          setYears={setYears}
          />
        );
      case 1:
        return (
          <Payment
          formData={formData}
          setFormData={setFormData}
         
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
    handleNext();
  }
  
  //handle on button submit for each step
  const handelSubmit = () => {
    if (activeStep === 0) {
    getChiNid();
    } else if (activeStep === 1) {
      handleNext();
    } else if (activeStep === 2) {
      handleNext();
    } else {
      return null;
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
