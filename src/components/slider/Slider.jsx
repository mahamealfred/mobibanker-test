import React from 'react'
import Marquee from 'react-fast-marquee'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Box,Card,CardMedia,Container,Grid, IconButton, ImageListItemBar, Typography } from '@mui/material';
import {makeStyles} from '@mui/material';
const itemData = [
    {
      img: '../../Assets/images/cardless.png',
      title: 'Breakfast',
    },
    {
        img: '../../Assets/images/disrupt.png',
        title: 'Breakfast',
      },
      {
        img: '../../Assets/images/helpdesk.png',
        title: 'Breakfast',
      },
      {
        img: '../../Assets/images/landpage.png',
        title: 'Breakfast',
      },
      {
        img: '../../Assets/images/nobank.png',
        title: 'Breakfast',
      },
      {
        img: '../../Assets/images/pagebanner.png',
        title: 'Breakfast',
      },
    ]
    const styles = {
        body:{
            background: "#3d4552",
            fontFamily: "arial",
            fontSize: "12px",
            color: "#fff",
        },
        
        img: {
            border: "1px solid #d2d2d2",
            padding: "3px",
            boxShadow: "0 0 15px rgba(0,0,0,.1)",
        },
        
        picContainer: {
            maxWidth: "210px",
            maxHeight: "210px",
            margin: "50px",
        },
        
        pic: {
            background: "#fff",
            position: "absolute",
            transition: "all 0.2s ease",
            backfaceVisibility:"hidden",
        },
        
        "pix:nth:child(1)": {
            zIndex: 3,
        },
        
        "pic:nth-child(2)": {
            zIndex: 1,
        },
        
        "pic:nth-child(3)": {
            zIndex: 2,
        },
        
        "picContainer:hover .pic:nth-child(1)": {
            transform: "rotate(15deg)",
            transition: "all 0.5s ease",
        },
        
        "picContainer:hover .pic:nth-child(2)": {
            transform: "rotate(7deg)",
            transition: "all 0.10s ease",
        },
        
        "picContainer:hover .pic:nth-child(3)": {
            transform: "rotate(-5deg)",
        },
        
        picCaption: {
            background: "#82a3d4",
            padding: "10px 15px",
            color: "#fff",
            fontSize: "12px",
            position: "relative",
            zIndex: "10",
            top: "90px",
            left: "200px",
            borderRadius: "3px",
            transition: "all 0.5s ease",
            opacity: 0,
        },
        
        "picCaption:hover": {
            background: "#607fae",
        },
        "picContainer:hover .pic-caption": {
            left:"230px",
            opacity: 1,
        },
        
     };
  
      
     
const Slider = (params) => {
  
  return (
   <Marquee pauseOnHover={true} speed={30} gradientColor={[255,69,0]}>
   <Box component="div" sx={{ display: 'inline' }}>
   <Grid
            container
            spacing={0}
            bgColor="transparent"
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
             sx={{ maxWidth: "auto" }}
        >{itemData.map((item) => (
          <Card
                raised
                // sx={{
                //     // maxWidth: 100,
                //     width:{xs:60,sm:70,md:60,lg:400},
                //     height:{xs:60,sm:60,md:60,lg:200},
                //     borderRadius:5,
                //     margin: "0 auto 5px",
                //     padding: "0.9em",
                //     objectFit: "contain",
                //     backgroundImage:  `url(${item.img})`
               // }}
               sx={{ maxWidth: 500,borderRadius:5,padding: "0.6em",margin: "0 auto 5px", }}
                key={item.img}
            >
                  
                <CardMedia
                    component="img"
                     height="220"
                     image={`${item.img}`}
                    alt={item.title}
                    title={item.title}
                    // sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                    // sx={{ 
                    //   padding: "0em 2em 0 0em", 
                    //   objectFit: "contain",
                    //  height:{xs:40,sm:40,md:40,lg:200}}}
                />
             
        
            </Card>  
               ))}
   </Grid>
    </Box>
   </Marquee>
  )
}

export default Slider