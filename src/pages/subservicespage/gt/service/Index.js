import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, CardHeader, Divider,Link } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

//modal
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import { useTranslation } from "react-i18next";

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
    const handleClickOpenAccount = () => {
      history.push("/dashboard/gt-bank-service/open-account",{push:true})
      // setOpenRRA(true);
    };
    const handleClickDeposit = () => {
      history.push("/dashboard/gt-bank-service/deposit",{push:true})
      // setOpenRRA(true);
    };
    const handleClickMoneyTransfer = () => {
      history.push("/dashboard/gt-bank-service/transfer",{push:true})
      // setOpenRRA(true);
    };
    const handleClickWithdraw = () => {
      history.push("/dashboard/gt-bank-service/withdraw",{push:true})
      // setOpenRRA(true);
    };
    return (
        <React.Fragment>
      <Grid 
        >
            <Typography component="h6" variant="body1"
         fontWeight={800}
         color="gray"
         textAlign="center"
         padding="0 0px 10px 0px"
         sx={{ fontSize: { xs: 20 } }}
         >
        GT BANK SERVICES
        </Typography>
          <CardMedia
                    component="img"
                    height="70"
                    image="../../images/gtbanklogo.png"
                    alt="alt"
                    title="i"
                    sx={{ padding: "0em 10em 2em 0em", objectFit: "contain",
                    height:{xs:40,sm:40,md:70,lg:70}}}
                />
            <Grid >
            <Typography 
            component="h1" variant="body1"
         fontWeight={800}
         color="gray"
         textAlign="center"
         sx={{ fontSize: { xs: 16 } }}
         >
      {/* {t("common:governmentservices")} */}
        </Typography>
        <Grid
    container
    spacing={0}
    alignItems="center"
    justifyContent="center"
 
>
      <Button
            onClick={handleClickOpenAccount}
           // onClick={()=> setOpenRRA(true)}
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
                    height="50"
                    
                    image="../../images/openaccount.png"
                    alt="alt"
                    title="i"
                    sx={{ 
                      padding: "0em 2em 0 0em", 
                      objectFit: "contain",
                     height:{xs:30,sm:30,md:30,lg:30},
                     width:60
                    }}
                     
                />
           <Typography  gutterBottom
                sx={{ padding: "1em 0em 0 0em",color:"gray",
                fontSize:10

             }}
           >
      Open Account
          </Typography>
            </Card>  
            </Button>
            <Button
            onClick={handleClickDeposit}
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
                    height="50"
                    image="../../images/deposit.png"
                    alt="alt"
                    title="i"
                    sx={{ 
                      padding: "0em 2em 0 0em", 
                      objectFit: "contain",
                     height:{xs:30,sm:30,md:30,lg:30},
                     width:60
                    }}
                     
                />
           <Typography variant="h6" gutterBottom
                sx={{ padding: "1em 0em 0 0em",color:"gray",
                fontSize:10
             }}
           >
            Deposit
          </Typography>
            </Card>  
            </Button>
            <Button
            onClick={handleClickMoneyTransfer}
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
                    height="50"
                    
                    image="../../images/transfer.png"
                    alt="alt"
                    title="i"
                    sx={{ 
                      padding: "0em 2em 0 0em", 
                      objectFit: "contain",
                     height:{xs:30,sm:30,md:30,lg:30},
                     width:60
                    }}
                     
                />
           <Typography variant="h6" gutterBottom
                sx={{ padding: "1em 0em 0 0em",color:"gray",
                fontSize:10
             }}
           >
         MONEY Transfer
          </Typography>
            </Card>  
            </Button>
            <Button
             onClick={handleClickWithdraw }
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
                    height="50"
                    
                    image="../../images/withdraw.png"
                    alt="alt"
                    title="i"
                    sx={{ 
                      padding: "0em 2em 0 0em", 
                      objectFit: "contain",
                     height:{xs:30,sm:30,md:30,lg:30},
                     width:60
                    }}
                     
                />
           <Typography variant="h6" gutterBottom
                sx={{ padding: "1em 0em 0 0em",color:"gray",
                fontSize:10
             }}
           >
            withdraw
          </Typography>
            </Card>  
            </Button>
           </Grid>
           {/* <Typography 
            component="h1" variant="body1"
         fontWeight={800}
         color="gray"
         textAlign="center"
         sx={{ fontSize: { xs: 16 } }}
         >
      {t("common:governmentservices")}
        </Typography> 
        <Grid
         container
         spacing={0}
         alignItems="center"
         justifyContent="center"
        >
 <Button
            // onClick={handleClickOpenLTSS}
            >
            <Card
               // raised
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
                    height="50"
                    
                    image="../../images/rssb.png"
                    alt="alt"
                    title="i"
                    sx={{ 
                      padding: "0em 2em 0 0em", 
                      objectFit: "contain",
                     height:{xs:40,sm:40,md:40,lg:40},
                     width:60
                    }}
                     
                />
           <Typography variant="h6" gutterBottom
                sx={{ padding: "1em 0em 0 0em",color:"gray",
                fontSize:10
             }}
           >
            RSSB
          </Typography>
            </Card>  
            </Button>     
          </Grid> */}
       
      </Grid>
      <Grid container>
               <Grid item xs>
                 <Link href="/dashboard" variant="body2">
       Cancel
                 </Link>
               </Grid>
               
             </Grid> 
      </Grid>
        </React.Fragment>
    );
}