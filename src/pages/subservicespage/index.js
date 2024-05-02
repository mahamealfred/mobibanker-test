import React from 'react'
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
    Typography,
    Container,
    CardActions,
    Avatar
  } from '@mui/material';
  import Service from "./gt/service/Index";
const index = (props) => {
  return (
   <React.Fragment>
           <Box m="10px"
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={0}
          style={{display:'flex',justifyContent:'center',alignItems:'center'}}
        >
          <Grid
            item
            lg={6}
            md={6}
            xs={12}
          >
        <Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
         justifyCenter:"center"
        }}
      >

        <Service/>
      </Box>
    </CardContent>
    {/*  */}
    {/* <Divider /> */}
    <CardActions>
      <Button
        color="primary"
        fullWidth
        variant="text"
      >
      </Button>
    </CardActions>
  </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
   </React.Fragment>
  )
}

export default index