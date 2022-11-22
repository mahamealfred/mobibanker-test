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
import { useTranslation } from "react-i18next";
import Link from "@mui/material/Link"
export default function Footer() {
  const { t } = useTranslation(["home","common","login"]);
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
          <FooterTitle variant="body1">{t("common:address")}</FooterTitle>
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
          <FooterTitle variant="body1"> {t("common:information")}</FooterTitle>
          <List>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
              {t("common:aboutus")}
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
              {t("common:trainings")}
              </Typography>
            </ListItemText>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
              
                <Link href="#">Privacy &amp; Policy</Link>
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
          <FooterTitle variant="body1"> {t("common:agentsupport")}</FooterTitle>
          <List>
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
              {t("common:email")}: info@mcash.rw
              </Typography>
              <br></br>
              <Typography lineHeight={2} variant="caption2">
              {t("common:phone")}: (+250) 787 797 979
              </Typography>
            </ListItemText>
            
            <ListItemText>
              <Typography lineHeight={2} variant="caption2">
              {t("common:website")}: www.mcash.rw
              </Typography>
            </ListItemText>
          </List>
        </Grid>
        <Grid item md={6} lg={4}>
          <FooterTitle variant="body1">{t("common:contactus")}</FooterTitle>
          <Stack>
          <SubscribeTf
              color="primary"
              label={t("common:fullname")}
              variant="standard"
            />
            <SubscribeTf
              color="primary"
              label={t("common:emailaddress")}
              variant="standard"
            />
             <SubscribeTf
              color="primary"
              label={t("common:message")}
              variant="standard"
            />
            <Button
              startIcon={<SendIcon sx={{ color: Colors.white }} />}
              sx={{ mt: 4, mb: 4 }}
              variant="contained"
            >
            {t("common:submit")}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
