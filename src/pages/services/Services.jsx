import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Typography,Grid } from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
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
  },
  ,
  {
    value:"bankservice",
    imgUrl:"../../Assets/images/bankservices.png",
    title:"Bank service"
  },
 
]

export default function BasicStack() {
  return (
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
          <Grid id="top-row" container spacing={0} elevetor={2} >
          {buttons.map((p, index) =>
           <Button key={p.value} value={p.value}
          variant="text" 
          size="small"
          //sx={{display:{sx:"flex"}}}
           style={{display:"flex",flexDirection:"column"}}
           >
        <img src={p.imgUrl} alt="logo" height="70" width="85" />
        <label> {p.title}</label>
          </Button>)}
      </Grid>
  </Box>
   
  );
}
