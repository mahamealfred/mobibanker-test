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

export default function MediaCard() {
  

    const [openRSSB, setOpenRSSB] = React.useState(false);
    const [openRRA, setOpenRRA] = React.useState(false);
    const [openLTSS, setOpenLTSS] = React.useState(false);
    const [openRNIT, setOpenRNIT] = React.useState(false);
  
  
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
            <Dialog
        open={openRRA}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        
          <Typography variant="h6" color="gray" >
          RRA Tax Payment Service
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
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
        <RraForm/>
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
          RSSB Mutuelle Service
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
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
     <CbhiIdentificationForm/>
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
          LTSS Service 
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
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
     <LtssForm/>
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
          RNIT Service 
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
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
      <RnitForm/>
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
         marginLeft="120px"
         sx={{ fontSize: { xs: 20 } }}
         >
       AGENCY SERVICES
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
           LTSS
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
                    image="../../Assets/images/ejoHeza.png"
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
            <Button>
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
                    image="../../Assets/images/airtime.png"
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
            AIRTiMe
          </Typography>
            </Card>  
            </Button>
     
      </Grid>
      
      </Grid>
        </React.Fragment>
    );
}