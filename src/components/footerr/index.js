import React from 'react'
import { Box,Typography,Link,Paper } from '@mui/material';
import Container from "@mui/material/Container";
import logo from "../../assets/images/logo.png"
function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://www.mobicashonline.com/">
        www.mobicashonline.com
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
const inde = () => {
  return (
    <Paper elevation={4} sx={{marginTop: 'calc(10% + 60px)',
    width: '100%',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    backgroundColor:"white"
    }} component="footer" square variant="outlined">
      <Container maxWidth="lg">
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            display: "flex",
            my:1
          }}
        >
            <Box>
            <img priority src={logo} width={140} height={40} alt="Logo" />
            </Box>
        </Box>

        <Box
          
        >
          {/* <Typography variant="h6" align="center" gutterBottom>
      MobiCash Ltd
    </Typography> */}
    <Copyright />
        </Box>
      </Container>
    </Paper>
  )
}

export default inde