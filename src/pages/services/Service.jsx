import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, CardHeader, Divider } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import RraForm from '../servicespages/rra/RraForm';
import CbhiIdentificationForm from '../servicespages/cbhi/CbhiIdentificationForm';
import LtssForm from "../servicespages/ltss/LtssForm";
import RnitForm from '../servicespages/rnit/RnitForm';
import ElectricityForm from "../servicespages/electricity/ElectricityForm";
import TopupMobile from "../servicespages/topupmobilemoney"
//modal
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import { useTranslation } from "react-i18next";
import Transactions from '../transactions/Transactions';
import { useHistory } from 'react-router-dom';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function MediaCard() {
  
  const { t } = useTranslation(["home","common","login"]);
    const history=useHistory();
    const [openRSSB, setOpenRSSB] = React.useState(false);
    const [openRRA, setOpenRRA] = React.useState(false);
    const [openLTSS, setOpenLTSS] = React.useState(false);
    const [openRNIT, setOpenRNIT] = React.useState(false);
    const [openMTN, setOpenMTN] = React.useState(false);
    const [openAIRTEL, setOpenAIRTEL] = React.useState(false);
    const [openLOGS, setOpenLOGS] = React.useState(false);
    const [openTopUp, setOpenTopUp] = React.useState(false);
    const [openELECTRICITY,setOpenELECTRICITY]=React.useState(false);

    const handleOpenMTN = () => setOpenMTN(true);
    const handleCloseMTN = () => setOpenMTN(false);
    const handleOpenAIRTEL = () => setOpenAIRTEL(true);
    const handleCloseAIRTEL = () => setOpenAIRTEL(false);
  
    
    const handleOpenLTSS= () => setOpenLTSS(true);
    
    const handleClickOpenElecticity = () => {
      setOpenELECTRICITY(true);
    };
    const handleClickOpenRRA = () => {
      setOpenRRA(true);
    };
    const handleClickOpenCBHI=()=>{
       setOpenRSSB(true)
      // history.push('/dashboard/cbhi',{push:true})
    }
    const handleClickOpenLTSS = () => {
      setOpenLTSS(true);
    };
    const handleClickOpenRNIT = () => {
      setOpenRNIT(true);
    };
    const handleClickOpenLOGS=()=>{
      setOpenLOGS(true)
    }
  
    const handleClose = () => {
      setOpenRSSB(false);
      setOpenRRA(false);
      setOpenLTSS(false);
      setOpenRNIT(false);
      setOpenLOGS(false)
      setOpenELECTRICITY(false)
      setOpenTopUp(false)
    };
   
  
    return (
        <React.Fragment>


{/* MTN MODAL */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openMTN}
        onClose={handleCloseMTN}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openMTN}>
          <Box sx={style}>
            <Typography id="transition-modal-title" 
            variant="h6" component="h2"
            >
              Dear customer,
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
             The service you are looking for will be available soon.
            </Typography>
            <IconButton
          aria-label="close"
          onClick={handleCloseMTN}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
          </Box>
        </Fade>
      </Modal>
      {/* AIRTEL */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openAIRTEL}
        onClose={handleCloseAIRTEL}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openAIRTEL}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Dear customer,
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
             The service you are looking for will be available soon.
            </Typography>
            <IconButton
          aria-label="close"
          onClick={handleCloseAIRTEL}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
          </Box>
        </Fade>
      </Modal>
      {/* ELECTRICITY */}
      <Dialog
        open={openELECTRICITY}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title">
        
          <Typography variant="h6" color="gray" >
          MobiCash
          </Typography>
          
          {/* <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton> */}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
        <ElectricityForm openELECTRICITY={openELECTRICITY} setOpenELECTRICITY={setOpenELECTRICITY}/>
          </DialogContentText>
        </DialogContent>
      </Dialog>
{/* RRA */}
            <Dialog
        open={openRRA}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title">
        
          <Typography variant="h6" color="gray" >
          MobiCash
          </Typography>
          {/* <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton> */}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
        <RraForm openRRA={openRRA} setOpenRRA={setOpenRRA}/>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      {/* rssb */}
      <Dialog
        open={openRSSB}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="lg"
       
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h6" color="gray" >
          MobiCash
          </Typography>
        
          {/* <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton> */}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
     <CbhiIdentificationForm openRSSB={openRSSB} setOpenRSSB={setOpenRSSB}/>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      {/* LTSS */}
      <Dialog
        open={openLTSS}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title">
        
          <Typography variant="h6" color="gray" >
          MobiCash
          </Typography>
       
          {/* <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton> */}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
     <LtssForm openLTSS={openLTSS} setOpenLTSS={setOpenLTSS}/>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      {/* Top Up Mobile Money */}
      <Dialog
        open={openTopUp}
        onClose={()=>setOpenTopUp(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="lg"
       
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h6" color="gray" >
          MobiCash
          </Typography>
        
          {/* <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton> */}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
  <TopupMobile/>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      {/* LOGS */}
      <Dialog
        open={openLOGS}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth="100%"
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title"
               style={{ overflow: "hidden" }}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "500px", 
            },
          },
        }}
        >
          <Typography variant="h6" color="gray" >
          MobiCash
          </Typography>
         
          {/* <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
   
        >
          <CloseIcon />
        </IconButton> */}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
       <Transactions/>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      {/* RNIT */}
      <Dialog
        open={openRNIT}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="lg"
        style={{
          boxShadow: "none"
        }}
      >
        <DialogTitle id="alert-dialog-title">
          
          <Typography variant="h6" color="gray" >
          MobiCash
          </Typography>
        
          {/* <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton> */}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
      <RnitForm openRNIT={openRNIT} setOpenRNIT={setOpenRNIT}/>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      
      
      <Grid
            // container
            // spacing={0}
            // bgColor="transparent"
            // direction="row"
            // justify="flex-start"
            // alignItems="flex-start"
            //  sx={{ maxWidth: "auto" }}
        >
            <Typography component="h1" variant="body1"
         fontWeight={800}
         color="gray"
         textAlign="center"
         padding="0 0px 30px 0px"
         sx={{ fontSize: { xs: 20 } }}
         >
         {t("common:agencyservices")}
        </Typography>
            <Grid >
            <Typography 
            component="h1" variant="body1"
         fontWeight={800}
         color="gray"
         textAlign="center"
         sx={{ fontSize: { xs: 16 } }}
         >
      {t("common:governmentservices")}
        </Typography>
            <Button
            // onClick={handleClickOpenRRA}
            onClick={()=> setOpenRRA(true)}
            >
            <Card
                raised
                sx={{
                    // maxWidth: 100,
                    width:{xs:60,sm:70,md:60,lg:60},
                    height:{xs:60,sm:60,md:60,lg:60},
                    borderRadius:5,
                    margin: "0 auto 5px",
                    padding: "0.9em",
                }}
            >
                <CardMedia
                    component="img"
                    height="60"
                    image="../../images/rra.png"
                    alt="alt"
                    title="i"
                    sx={{ 
                      padding: "0em 2em 0 0em", 
                      objectFit: "contain",
                     height:{xs:40,sm:40,md:40,lg:40}}}
                />
           <Typography  gutterBottom
           
                sx={{ padding: "0em 0em 0 0em",color:"gray",
                fontSize:14

             }}
           >
            RRA 
          </Typography>
            </Card>  
            </Button>
            <Button
            onClick={handleClickOpenCBHI}
            >
            <Card
                raised
                sx={{
                   // maxWidth: 100,
                   width:{xs:60,sm:70,md:60,lg:60},
                    height:{xs:60,sm:60,md:60,lg:60},
                    borderRadius:5,
                    margin: "0 auto 5px",
                    padding: "0.9em",
                }}
            >
                <CardMedia
                    component="img"
                    height="60"
                    image="../../images/mutuelli.png"
                    alt="alt"
                    title="i"
                    sx={{ padding: "0em 2em 0 0em", objectFit: "contain",
                    height:{xs:40,sm:40,md:40,lg:40}}}
                />
           <Typography variant="h6" gutterBottom
                sx={{ padding: "0em 0em 0 0em",color:"gray",
                fontSize:14
             }}
           >
            MUTUELL
          </Typography>
            </Card>  
            </Button>
            <Button
            onClick={handleClickOpenRNIT}
            >
            <Card
                raised
                sx={{
                   // maxWidth: 100,
                   width:{xs:60,sm:70,md:60,lg:60},
                    height:{xs:60,sm:60,md:60,lg:60},
                    borderRadius:5,
                    margin: "0 auto 5px",
                    padding: "0.9em",
                }}
            >
                <CardMedia
                    component="img"
                    height="60"
                    image="../../images/rnit.png"
                    alt="alt"
                    title="i"
                    sx={{ padding: "0em 2em 0 0em", objectFit: "contain",
                    height:{xs:40,sm:40,md:40,lg:40}}}
                />
           <Typography variant="h6" gutterBottom
                sx={{ padding: "0em 0em 0 0em",color:"gray",
                fontSize:14
             }}
           >
          RNIT
          </Typography>
            </Card>  
            </Button>
            <Button
            onClick={handleClickOpenLTSS}
            >
            <Card
                raised
                sx={{
                   // maxWidth: 100,
                   width:{xs:60,sm:70,md:60,lg:60},
                   height:{xs:60,sm:60,md:60,lg:60},
                   borderRadius:5,
                    margin: "0 auto 5px",
                    padding: "0.9em",
                }}
            >
               <CardMedia
                    component="img"
                    height="60"
                    image="../../images/ejoheza.png"
                    alt="alt"
                    title="i"
                    sx={{ padding: "0em 2em 0 0em", objectFit: "contain",
                    height:{xs:40,sm:40,md:40,lg:40}}}
                />
           <Typography variant="h6" gutterBottom
                sx={{ padding: "0em 0em 0 0em",color:"gray",
                fontSize:14
             }}
           >
            EJOHEZA
          </Typography>
            </Card>  
            </Button>
          
           
{/*            
            <Button
            onClick={handleClickOpenLOGS}
            >
            <Card
                raised
                sx={{
                   // maxWidth: 100,
                   width:{xs:60,sm:70,md:60,lg:80},
                    height:{xs:60,sm:60,md:60,lg:60},
                    borderRadius:5,
                    margin: "0 auto 5px",
                    padding: "0.9em",
                }}
            >
                <CardMedia
                    component="img"
                    height="60"
                    image="../../images/logs.png"
                    alt="alt"
                    title="i"
                    sx={{ padding: "0em 2em 0 0em", objectFit: "contain",
                    height:{xs:40,sm:40,md:40,lg:40}}}
                />
           <Typography variant="h6" gutterBottom
                sx={{ padding: "0em 0em 0 0em",color:"gray",
                fontSize:14
             }}
           >
          LOGS
          </Typography>
            </Card>  
            </Button> */}
               <Divider variant="middle" />
               <Typography component="h1" variant="h5"
         fontWeight={800}
         color="gray"
         textAlign="center"
         sx={{ fontSize: { xs: 16 } }}
         >
             <Divider variant="middle" />
              {t("common:otherservices")}
        </Typography>
        <Button
         onClick={handleClickOpenElecticity}
            >
            <Card
                raised
                sx={{
                   // maxWidth: 100,
                   width:{xs:60,sm:70,md:60,lg:60},
                   height:{xs:60,sm:60,md:60,lg:60},
                   borderRadius:5,
                    margin: "0 auto 5px",
                    padding: "0.9em",
                }}
            >
                <CardMedia
                    component="img"
                    height="60"
                    image="../../images/electricity.png"
                    alt="alt"
                    title="i"
                    sx={{ padding: "0em 2em 0 0em", objectFit: "contain",
                    height:{xs:40,sm:40,md:40,lg:40}}}
                />
           <Typography variant="h6" gutterBottom
                sx={{ padding: "0em 0em 0 0em",color:"gray",
                fontSize:12
             }}
           >
           ELECTRICITY
          </Typography>
            </Card>  
            </Button>
            <Button
             onClick={()=>setOpenTopUp(true)}
             disabled
            >
            <Card
                raised
                sx={{
                    //maxWidth: 100,
                    width:{xs:60,sm:70,md:60,lg:60},
                    height:{xs:60,sm:60,md:60,lg:60},
                    borderRadius:5,
                    margin: "0 auto 5px",
                    padding: "0.9em",
                }}
            >
                <CardMedia
                    component="img"
                    height="70"
                    image="../../images/topup.png"
                    alt="alt"
                    title="i"
                    sx={{ padding: "0em 2em 0 0em", objectFit: "contain",
                    height:{xs:40,sm:40,md:40,lg:50}}}
                />
           <Typography variant="h6" gutterBottom
                sx={{ padding: "0em 0em 0 0em",color:"gray",
                fontSize:8
             }}
           >
            TOpUp Mobile Money
          </Typography>
            </Card>  
            </Button>
            <Divider variant="middle" />
            {/* <Typography component="h1" variant="h5"
         fontWeight={800}
         color="text.primary"
         textAlign="center"
      
        
         sx={{ fontSize: { xs: 16 } }}
         >
     {t("common:airtime")}
        </Typography>
        <Button
            onClick={handleOpenAIRTEL}
            disabled
            >
            <Card
                raised
                sx={{
                    //maxWidth: 100,
                    width:{xs:60,sm:70,md:60,lg:60},
                    height:{xs:60,sm:60,md:60,lg:60},
                    borderRadius:5,
                    margin: "0 auto 5px",
                    padding: "0.9em",
                }}
            >
                <CardMedia
                    component="img"
                    height="60"
                    image="../../images/airtel.png"
                    alt="alt"
                    title="i"
                    sx={{ padding: "0em 2em 0 0em", objectFit: "contain",
                    height:{xs:40,sm:40,md:40,lg:40}}}
                />
           <Typography variant="h6" gutterBottom
                sx={{ padding: "0em 0em 0 0em",color:"gray",
                fontSize:14
             }}
           >
            AIRTEL
          </Typography>
            </Card>  
            </Button> */}
            {/* <Button
            disabled
            onClick={handleOpenMTN}
            >
            <Card
                raised
                sx={{
                    //maxWidth: 100,
                    width:{xs:60,sm:70,md:60,lg:60},
                    height:{xs:60,sm:60,md:60,lg:60},
                    borderRadius:5,
                    margin: "0 auto 5px",
                    padding: "0.9em",
                }}
            >
                <CardMedia
                    component="img"
                    height="60"
                    image="../../images/mtn1.png"
                    alt="alt"
                    title="i"
                    sx={{ padding: "0em 2em 0 0em", objectFit: "contain",
                    height:{xs:40,sm:40,md:40,lg:40}}}
                />
           <Typography variant="h6" gutterBottom
                sx={{ padding: "0em 0em 0 0em",color:"gray",
                fontSize:14
             }}
           >
            MTN
          </Typography>
            </Card>  
            </Button>
             */}
       
       <Divider variant="middle" />
        <Typography component="h1" variant="h5"
         fontWeight={800}
         color="text.primary"
         textAlign="center"
         sx={{ fontSize: { xs: 16 } }}
         >
       {/* {t("common:agencybanking")} */}
        </Typography>
        <Typography component="h1" variant="h5"
         fontWeight={800}
         color="gray"
         textAlign="center"
      
        
         sx={{ fontSize: { xs: 20 } }}
         >
      {/* School services */}
        </Typography>
        
      </Grid>

      </Grid>
        </React.Fragment>
    );
}