import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Typography,Grid } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import RraForm from '../servicespages/rra/RraForm';
import CbhiIdentificationForm from '../servicespages/cbhi/CbhiIdentificationForm';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const buttons=[
  {
    value:"rra",
    imgUrl:"../../Assets/images/rra.png",
    title:"RRA"
  },
  {
    value:"rssb",
    imgUrl:"../../Assets/images/mutuelli.png",
    title:"RSSB"
  },
  {
    value:"rnit",
    imgUrl:"../../Assets/images/rnit.png",
    title:"RNIT"
  },
  {
    value:"electricity",
    imgUrl:"../../Assets/images/electricity.png",
    title:"Electricity"
  },
  {
    value:"ejoHeza",
    imgUrl:"../../Assets/images/ejoHeza.png",
    title:"EjoHeza"
  },
  {
    value:"bankservice",
    imgUrl:"../../Assets/images/bankservices.png",
    title:"Bank service"
  }
]

export default function BasicStack() {
  const [openRSSB, setOpenRSSB] = React.useState(false);
  const [openRRA, setOpenRRA] = React.useState(false);


  const handleClickOpenRRA = () => {
    setOpenRRA(true);
  };
  const handleClickOpenCBHI=()=>{
    setOpenRSSB(true)
  }

  const handleClose = () => {
    setOpenRSSB(false);
    setOpenRRA(false);
  };
 

 
  return (
    <React.Fragment>
      {/* rra  */}
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
 <Box
    sx={{ fontSize: { xs: 20 }}}
    spacing={18}
  direction="column"
  alignItems="center"
  justifyContent="center"
      >
         <Typography component="h1" variant="h5"
         fontWeight={800}
         color="gray"
         padding={5}
         sx={{ fontSize: { xs: 20 } }}
         >
       AGENCY SERVICES
        </Typography> 
       
       
  <Grid id="top-row" container spacing={0} elevetor={2}  > 
          {/* {buttons.map((p, index) =>
           <Button 
           key={p.value} 
           value={p.value}
          variant="text" 
          size="small"
          style={{display:"flex",flexDirection:"column"}}
          onClick={handleOnClick}
           >
        <img src={p.imgUrl} alt="logo" 
        height="70" width="85"
        />
        <label>{p.title}</label>
        </Button>)} */}
         <Button 
          variant="text" 
          size="small"
          style={{display:"flex",flexDirection:"column"}}
          onClick={handleClickOpenRRA}
           >
        <img src="../../Assets/images/rra.png" alt="logo" 
          height="70" width="85"
          />
        <label>RRA</label>
        </Button>
        <Button 
          variant="text" 
          size="small"
          style={{display:"flex",flexDirection:"column"}}
           onClick={handleClickOpenCBHI}
           >
        <img src="../../Assets/images/mutuelli.png" alt="logo" 
          height="70" width="85"
          />
        <label>RSSB</label>
        </Button>
        <Button 
          variant="text" 
          size="small"
          style={{display:"flex",flexDirection:"column"}}
          // onClick={handleOnClick}
           >
        <img src="../../Assets/images/ejoHeza.png" alt="logo" 
          height="70" width="85"
          />
        <label>EjoHeza</label>
        </Button>
        <Button 
          variant="text" 
          size="small"
          style={{display:"flex",flexDirection:"column"}}
          // onClick={handleOnClick}
           >
        <img src="../../Assets/images/rnit.png" alt="logo" 
          height="70" width="85"
          />
        <label>RNIT</label>
        </Button>
        <Button 
          variant="text" 
          size="small"
          style={{display:"flex",flexDirection:"column"}}
          // onClick={handleOnClick}
           >
        <img src="../../Assets/images/electricity.png" alt="logo" 
          height="70" width="85"
          />
        <label>ELECTRICITY</label>
        </Button>
        <Button 
          variant="text" 
          size="small"
          style={{display:"flex",flexDirection:"column"}}
          // onClick={handleOnClick}
           >
        <img src="../../Assets/images/bankservices.png" alt="logo" 
          height="70" width="85"
          />
        <label>MOBIBANKER</label>
        </Button>
      </Grid>
  </Box>
    </React.Fragment>
   
  );
}
