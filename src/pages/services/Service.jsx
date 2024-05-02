import * as React from 'react';
import Card from '@mui/material/Card';

import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, CardHeader, Divider, CssBaseline } from '@mui/material';

//modal

import { useTranslation } from "react-i18next";

import { useHistory } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom';
import AuthContext from '../../context';

export default function MediaCard() {
  
  const { t } = useTranslation(["home","common","login"]);
  const {auth}=React.useContext(AuthContext)
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
  const router=useRouteMatch()
    
    const handleOpenLTSS= () => setOpenLTSS(true);
    
    const handleClickOpenElecticity = () => {
      history.push("/dashboard/electricity-service",{push:true})
      // setOpenELECTRICITY(true);
    };
    const handleClickOpenRRA = () => {
      history.push("/dashboard/rra-service",{push:true})
      // setOpenRRA(true);
    };
    const handleClickOpenCBHI=()=>{
       //setOpenRSSB(true)
       history.push('/dashboard/cbhi-service',{push:true})
    }
    const handleClickOpenLTSS = () => {
      //setOpenLTSS(true);
      history.push('/dashboard/ltss-service',{push:true})
    };
    const handleClickOpenRNIT = () => {
      //setOpenRNIT(true);
      history.push('/dashboard/rnit-service',{push:true})
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
    const openGtClient=()=>{
      history.push("/dashboard/gt-bank-service",{push:true})
    }
   const handleMobishuli=()=>{
    history.push("/dashboard/mobishuli-service",{push:true})
   }
   const handleTopUp=()=>{
    history.push("/dashboard/topup-mobile-money",{push:true})
   }

const openRiaService=()=>{
  history.push("/dashboard/ria-service",{push:true})
}


    return (
        <React.Fragment>
          <CssBaseline/>
      <Grid>
             <Typography gutterBottom variant="h6"  textAlign="center">
             {t("common:agencyservices")}
            </Typography>
         
            <Grid >
            <Typography variant="body2" textAlign="center" sx={{ color: 'text.secondary' }}>
      {t("common:governmentservices")}
        </Typography>
        <Grid
  container
  spacing={0}
  alignItems="center"
  justifyContent="center"
 
>
<Button
            onClick={handleClickOpenRRA}
           // onClick={()=> setOpenRRA(true)}
            >
            <Card
                raised
                sx={{
                    // maxWidth: 100,
                    width:{xs:50,sm:60,md:60,lg:80},
                    height:{xs:60,sm:60,md:60,lg:90},
                    borderRadius:5,
                    justifyContent:"center"
                    
                }}
            >
                <CardMedia
                    component="img"
             
                    image="../../images/rra.png"
                    alt="alt"
                    title="i"
                    sx={{ 
                       padding: "0.8em 0em 0 0em", 
                      objectFit: "contain",
                
                    }}
                />
       
            </Card>  
            </Button>
            <Button
            onClick={handleClickOpenCBHI}
            >
            <Card
                raised
                sx={{
                  // maxWidth: 100,
                  width:{xs:50,sm:60,md:60,lg:80},
                  height:{xs:60,sm:60,md:60,lg:90},
                  borderRadius:5,
                  justifyContent:"center"
                  
              }}
            >
                <CardMedia
                    component="img"
                   
                    image="../../images/mutuelli.png"
                    alt="alt"
                    title="i"
                    sx={{ 
                      padding: "0.8em 0em 0 0em", 
                     objectFit: "contain",
               
                   }}
                />
         
            </Card>  
            </Button>
            <Button
            onClick={handleClickOpenRNIT}
            >
            <Card
                raised
                sx={{
                  // maxWidth: 100,
                  width:{xs:50,sm:60,md:60,lg:80},
                  height:{xs:60,sm:60,md:60,lg:90},
                  borderRadius:5,
                  justifyContent:"center"
                  
              }}
            >
                <CardMedia
                    component="img"
              
                    image="../../images/rnit.png"
                    alt="alt"
                    title="i"
                    sx={{ 
                      padding: "0.8em 0em 0 0em", 
                     objectFit: "contain",
               
                   }}
                />
        
            </Card>  
            </Button>
            <Button
            onClick={handleClickOpenLTSS}
            >
            <Card
                raised
                sx={{
                  // maxWidth: 100,
                  width:{xs:50,sm:60,md:60,lg:80},
                  height:{xs:60,sm:60,md:60,lg:90},
                  borderRadius:5,
                  justifyContent:"center"
                  
              }}
            >
               <CardMedia
                    component="img"
                    image="../../images/ejoheza.png"
                    alt="alt"
                    title="i"
                    sx={{ 
                      padding: "0.8em 0em 0 0em", 
                     objectFit: "contain",
               
                   }}
                />
       
            </Card>  
            </Button>
        </Grid>
               <Divider variant="middle" />
               <Typography variant="body2" textAlign="center" sx={{ color: 'text.secondary' }}>
             
              {t("common:otherservices")}
        </Typography>
        <Grid
  container
  spacing={0}
  alignItems="center"
  justifyContent="center"
 
>
<Button
         onClick={handleClickOpenElecticity}
            >
            <Card
                raised
                sx={{
                  // maxWidth: 100,
                  width:{xs:50,sm:60,md:60,lg:80},
                  height:{xs:60,sm:60,md:60,lg:90},
                  borderRadius:5,
                  justifyContent:"center"
                  
              }}
            >
                <CardMedia
                    component="img"
              
                    image="../../images/electricity.png"
                    alt="alt"
                    title="i"
                    sx={{ 
                      padding: "0.8em 0em 0 0em", 
                     objectFit: "contain",
               
                   }}
                />
       
            </Card>  
            </Button>
            <Button
              onClick={handleTopUp}
     
            //  disabled
            >
            <Card
                raised
                sx={{
                  // maxWidth: 100,
                  width:{xs:50,sm:60,md:60,lg:80},
                  height:{xs:60,sm:60,md:60,lg:90},
                  borderRadius:5,
                  justifyContent:"center"
                  
              }}
            >
                <CardMedia
                    component="img"
              
                    image="../../images/topup.png"
                    alt="alt"
                    title="i"
                    sx={{ 
                      padding: "0.8em 0em 0 0em", 
                     objectFit: "contain",
               
                   }}
                />
       
            </Card>  
            </Button>
            <Button
            disabled
             onClick={handleMobishuli}
            >
            <Card
                raised
                sx={{
                  // maxWidth: 100,
                  width:{xs:50,sm:60,md:60,lg:80},
                  height:{xs:60,sm:60,md:60,lg:90},
                  borderRadius:5,
                  justifyContent:"center"
                  
              }}
            >
                <CardMedia
                    component="img"
             
                    image="../../images/mobishuli.png"
                    alt="alt"
                    title="i"
                    sx={{ 
                      padding: "0.8em 0em 0 0em", 
                     objectFit: "contain",
               
                   }}
                />
         
            </Card>  
            </Button>
</Grid>
        {
          auth?.agencyBanking===true?
          <>
              <Divider variant="middle" />
            <Divider variant="middle" />
            <Typography variant="body2" textAlign="center" sx={{ color: 'text.secondary' }}>
             
              {t("common:agencybanking")}
        </Typography>
        <Grid
  container
  spacing={0}
  alignItems="center"
  justifyContent="center"
 
>
<Button
         onClick={openGtClient}
            >
            <Card
                raised
                sx={{
                  // maxWidth: 100,
                  width:{xs:50,sm:60,md:60,lg:80},
                  height:{xs:60,sm:60,md:60,lg:90},
                  borderRadius:5,
                  justifyContent:"center"
                  
              }}
            >
                <CardMedia
                    component="img"
                   height="70"
                    image="../../images/gtbankImg.png"
                    alt="alt"
                    title="i"
                    sx={{ 
                      padding: "0.8em 0em 0 0em", 
                     objectFit: "contain",
                     height:{xs:50,sm:70}  
                   }}
                />
         
            </Card>  
            </Button>
            {/* <Button
         onClick={openRiaService}
            >
            <Card
                raised
                sx={{
                  // maxWidth: 100,
                  width:{xs:50,sm:60,md:60,lg:80},
                  height:{xs:60,sm:60,md:60,lg:90},
                  borderRadius:5,
                  justifyContent:"center"
                  
              }}
            >
                <CardMedia
                    component="img"
                   height="70"
                    image="../../images/ria.jpg"
                    alt="alt"
                    title="i"
                    sx={{ 
                      padding: "0.8em 0em 0 0em",
                     objectFit: "contain",
                     height:{xs:50,sm:70}  
                   }}
                />
         
            </Card>  
            </Button> */}
      </Grid>
          </>:null
        }
        
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