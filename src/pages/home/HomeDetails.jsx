import React from 'react'
import { Box, Container, Divider, Grid, Typography } from '@mui/material'
import { useTranslation } from "react-i18next";
import jwt from "jsonwebtoken";
import Paper from '@mui/material/Paper';
import Widget from '../../components/widget/Widget';
import Service from '../services/Service';
const HomeDetails = () => {
    const { i18n,t } = useTranslation(["home","common","login"]);
    const [agentName,setAgentName]=React.useState("");
  return (
    <React.Fragment>
     <Box sx={{ display: 'flex' ,height:"auto"}}>
<Box>
        <Container maxWidth="fullWidth" sx={{ mt:1, mb: 2,display:"flex" ,backgroundColor: 'white' }}>
            <Grid container component="main" sx={{ height: 'auto', backgroundColor: 'transparent' }}>
              <Grid item xs={12} sm={6} md={5} component={Paper} elevation={0} square
                sx={{
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: 'white',
                }}
              >
                <Box
                  sx={{
                    my: 2,
                    mx: 0,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width:"auto"
                  }}
                
                >
                  <Service />
                </Box>
              </Grid>
             
              <Grid
                item
                // xs={false}
                xs={12}
                sm={4}
                md={7}
                sx={{
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: 'white',
                }}
              >
                <Widget/>
              </Grid>
            </Grid>
          </Container>
            
        </Box>
          
        </Box>   
    </React.Fragment>
  )
}

export default HomeDetails