import {
  Grid,
  List,
  ListItemText,
  Typography,
  Button,
  Stack
} from "@mui/material";
import { Box } from "@mui/system";
import { Colors } from "../styles/theme"
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { SubscribeTf, FooterTitle } from "../styles/footer";
import SendIcon from "@mui/icons-material/Send";

export default function Footer() {
  return (
    <Box
      sx={{
        background: Colors.shaft,
        color: Colors.white,
        p: { xs: 4, md: 10 },
        pt: 12,
        pb: 12,
        fontSize: { xs: '12px', md: '14px' }
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid item md={6} lg={4}>
          <FooterTitle variant="body1">Address</FooterTitle>
          <Typography variant="caption2">
          MobiCash Rwanda
          KN 3 Road, Gasabo District
          Remera, Rukiri 1
          Kigali - Rwanda
          </Typography>
         
          <Box
            sx={{
              mt: 4,
              color: Colors.dove_gray,
            }}
          >
            <FacebookIcon sx={{ mr: 1 }} />
            <TwitterIcon sx={{ mr: 1 }} />
            <InstagramIcon />
          </Box>
        </Grid>
        <Grid item md={6} lg={2}>
          <FooterTitle variant="body1">information</FooterTitle>
          <List>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
                About Us
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
             Trannings
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
                Privacy &amp; Policy
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
                Terms &amp; Conditions
              </Typography>
            </ListItemText>
          </List>
        </Grid>
        <Grid item md={6} lg={2}>
          <FooterTitle variant="body1">Agent support</FooterTitle>
          <List>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
              Email: info@mcash.rw
              </Typography>
              <Typography lineHeight={2} variant="caption2">
              Phone: (+250) 787 797 979
              </Typography>
             
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
              Website: www.mcash.rw
              </Typography>
            </ListItemText>
          </List>
        </Grid>
        <Grid item md={6} lg={4}>
          <FooterTitle variant="body1">Contact us</FooterTitle>
          <Stack>
          <SubscribeTf
              color="primary"
              label="Full Name"
              variant="standard"
            />
            <SubscribeTf
              color="primary"
              label="Email address"
              variant="standard"
            />
             <SubscribeTf
              color="primary"
              label="Message"
              variant="standard"
            />
            <Button
              startIcon={<SendIcon sx={{ color: Colors.white }} />}
              sx={{ mt: 4, mb: 4 }}
              variant="contained"
            >
              Submit
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
