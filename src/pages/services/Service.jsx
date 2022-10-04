import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, CardHeader } from '@mui/material';
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

//modal
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useTranslation } from "react-i18next";

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
    const [openRSSB, setOpenRSSB] = React.useState(false);
    const [openRRA, setOpenRRA] = React.useState(false);
    const [openLTSS, setOpenLTSS] = React.useState(false);
    const [openRNIT, setOpenRNIT] = React.useState(false);
    const [openMTN, setOpenMTN] = React.useState(false);
    const [openAIRTEL, setOpenAIRTEL] = React.useState(false);
    const handleOpenMTN = () => setOpenMTN(true);
    const handleCloseMTN = () => setOpenMTN(false);
    const handleOpenAIRTEL = () => setOpenAIRTEL(true);
    const handleCloseAIRTEL = () => setOpenAIRTEL(false);
    
    const handleOpenLTSS= () => setOpenLTSS(true);

    const handleClickOpenRRA = () => {
      setOpenRRA(true);
    };
    const handleClickOpenCBHI=()=>{
      setOpenRSSB(true)
    }
    const handleClickOpenLTSS = () => {
      setOpenLTSS(true);
    };
    const handleClickOpenRNIT = () => {
      setOpenRNIT(true);
    };
  
    const handleClose = () => {
      setOpenRSSB(false);
      setOpenRRA(false);
      setOpenLTSS(false);
      setOpenRNIT(false);
    };
   
  
    return (
        <React.Fragment>


{/* MTN MODAL */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openMTN}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openMTN}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Dear customer,
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
             Ther service you are looking for will be available soon.
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
        onClose={handleClose}
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
      {/* MODAL RNIT */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openRNIT}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openRNIT}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Dear customer,
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
             The service you are looking for will be available soon .
            
            </Typography>
            <IconButton
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
        </IconButton>
          </Box>
        </Fade>
      </Modal>

            <Dialog
        open={openRRA}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        
          <Typography variant="h6" color="gray" >
          MobiCash
          </Typography>
          {/* <Box
        component="img"
        sx={{
          height: 50,
          width: 180,
          marginLeft:8,
          position: 'absolute',
            right: 50,
            top: 8,
          maxHeight: { xs: 40, md: 50 },
          maxWidth: { xs: 80, md: 180 },
       
        }}
        alt="mobicash logo"
        src="../../Assets/images/logo.png"
      /> */}
          <IconButton
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
        </IconButton>
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
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        
         
          <Typography variant="h6" color="gray" >
          MobiCash
          </Typography>
          {/* <Box
        component="img"
        sx={{
          height: 50,
          width: 180,
          marginLeft:8,
          position: 'absolute',
            right: 50,
            top: 8,
          maxHeight: { xs: 40, md: 50 },
          maxWidth: { xs: 80, md: 180 },
       
        }}
        alt="mobicash logo"
        src="../../Assets/images/logo.png"
      /> */}
          <IconButton
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
        </IconButton>
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
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        
          <Typography variant="h6" color="gray" >
          MobiCash
          </Typography>
          {/* <Box
        component="img"
        sx={{
          height: 50,
          width: 180,
          marginLeft:8,
          position: 'absolute',
            right: 50,
            top: 8,
          maxHeight: { xs: 40, md: 50 },
          maxWidth: { xs: 80, md: 180 },
       
        }}
        alt="mobicash logo"
        src="../../Assets/images/logo.png"
      /> */}
          <IconButton
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
        </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
     <LtssForm openLTSS={openLTSS} setOpenLTSS={setOpenLTSS}/>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      {/* RNIT */}
      <Dialog
        open={openRNIT}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          
          <Typography variant="h6" color="gray" >
          MobiCash
          </Typography>
          {/* <Box
        component="img"
        sx={{
          height: 50,
          width: 180,
          marginLeft:8,
          position: 'absolute',
            right: 50,
            top: 8,
          maxHeight: { xs: 40, md: 50 },
          maxWidth: { xs: 80, md: 180 },
       
        }}
        alt="mobicash logo"
        src="../../Assets/images/logo.png"
      /> */}
          <IconButton
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
        </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
      <RnitForm openRNIT={openRNIT} setOpenRNIT={setOpenRNIT}/>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      
      <Grid
            container
            spacing={0}
            bgColor="transparent"
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            sx={{ maxWidth: "auto" }}
        >
            <Typography component="h1" variant="h5"
         fontWeight={800}
         color="gray"
         textAlign="center"
         padding="0 25px 30px 2px"
        
         sx={{ fontSize: { xs: 20 } }}
         >
         {t("common:agencyservices")}
        </Typography>
            <Grid >
            <Button
            onClick={handleClickOpenRRA}
            >
            <Card
                raised
                sx={{
                    // maxWidth: 100,
                    width:{xs:60,sm:80,md:100,lg:80},
                    margin: "0 auto 5px",
                    padding: "0.9em",
                }}
            >
                <CardMedia
                    component="img"
                    height="60"
                    image="../../Assets/images/rra.png"
                    alt="alt"
                    title="i"
                    sx={{ padding: "0em 2em 0 0em", objectFit: "contain",
                     height:{xs:40,sm:50,md:60}}}
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
                   width:{xs:60,sm:80,md:100,lg:80},
                    margin: "0 auto 5px",
                    padding: "0.9em",
                }}
            >
                <CardMedia
                    component="img"
                    height="60"
                    image="../../Assets/images/mutuelli.png"
                    alt="alt"
                    title="i"
                    sx={{ padding: "0em 2em 0 0em", objectFit: "contain",
                     height:{xs:40,sm:50,md:60} }}
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
                   width:{xs:60,sm:80,md:100,lg:80},
                    margin: "0 auto 5px",
                    padding: "0.9em",
                }}
            >
                <CardMedia
                    component="img"
                    height="60"
                    image="../../Assets/images/rnit.png"
                    alt="alt"
                    title="i"
                    sx={{ padding: "0em 2em 0 0em", objectFit: "contain",
                     height:{xs:40,sm:50,md:60} }}
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
            >
            <Card
                raised
                sx={{
                   // maxWidth: 100,
                    width:{xs:60,sm:80,md:100,lg:80},
                    margin: "0 auto 5px",
                    padding: "0.9em",
                }}
            >
                <CardMedia
                    component="img"
                    height="60"
                    image="../../Assets/images/electricity.png"
                    alt="alt"
                    title="i"
                    sx={{ padding: "0em 2em 0 0em", objectFit: "contain",
                     height:{xs:40,sm:50,md:60} }}
                />
           <Typography variant="h6" gutterBottom
                sx={{ padding: "0em 0em 0 0em",color:"gray",
                fontSize:14
             }}
           >
           ELECTRICITY
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
                    width:{xs:60,sm:80,md:100,lg:80},
                    margin: "0 auto 5px",
                    padding: "0.9em",
                }}
            >
               <CardMedia
                    component="img"
                    height="60"
                    image="../../Assets/images/ejoheza.png"
                    alt="alt"
                    title="i"
                    sx={{ padding: "0em 2em 0 0em", objectFit: "contain",
                     height:{xs:40,sm:50,md:60} }}
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
            <Button
            onClick={handleOpenAIRTEL}
            >
            <Card
                raised
                sx={{
                    //maxWidth: 100,
                    width:{xs:60,sm:80,md:100,lg:80},
                    margin: "0 auto 5px",
                    padding: "0.9em",
                }}
            >
                <CardMedia
                    component="img"
                    height="60"
                    image="../../Assets/images/airtel.png"
                    alt="alt"
                    title="i"
                    sx={{ padding: "0em 2em 0 0em", objectFit: "contain",
                     height:{xs:40,sm:50,md:60} }}
                />
           <Typography variant="h6" gutterBottom
                sx={{ padding: "0em 0em 0 0em",color:"gray",
                fontSize:14
             }}
           >
            AIRTEL
          </Typography>
            </Card>  
            </Button>
            <Button
            onClick={handleOpenMTN}
            >
            <Card
                raised
                sx={{
                    //maxWidth: 100,
                    width:{xs:60,sm:80,md:100,lg:80},
                    margin: "0 auto 5px",
                    padding: "0.9em",
                }}
            >
                <CardMedia
                    component="img"
                    height="60"
                    image="../../Assets/images/mtn1.png"
                    alt="alt"
                    title="i"
                    sx={{ padding: "0em 2em 0 0em", objectFit: "contain",
                     height:{xs:40,sm:50,md:60} }}
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
      </Grid>
      
      </Grid>
        </React.Fragment>
    );
}