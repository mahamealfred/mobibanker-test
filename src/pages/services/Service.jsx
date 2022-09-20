import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, CardHeader } from '@mui/material';

export default function MediaCard() {
    // const data=[
    //     {
    //         title:"RRA",

    //     }
    // ]
    return (
        <Grid
            container
            spacing={0}
            bgColor="transparent"
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            sx={{ maxWidth: "auto" }}
        >
            <Grid >
            <Button>
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
            <Button>
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
            <Button>
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
            <Button>
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
           ELECTRIC
          </Typography>
            </Card>  
            </Button>
            <Button>
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
    );
}