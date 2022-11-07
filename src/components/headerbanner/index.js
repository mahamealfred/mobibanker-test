import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
function FeaturedPost() {
  const { t } = useTranslation(["home","common","login"]);
  
  return (
    <React.Fragment>

      <Box sx={{ flexGrow: 1 }}>
      <Box display="flex" justifyContent="center" alignItems="center"
      sx={{padding:"50px"}}
      >
      <Typography  variant="h4" fontSize="18" fontWeight="800" >{t("common:solutionsthatnevermisstheaim")}</Typography>
      </Box>
        
        <Grid container alignItems="center" alignContent="center" padding={{ xs: 6, md: 10 }} spacing={{ xs: 2, md: 6 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={12} sm={4} md={6} alignItems="center">
            <Grid container justifyContent="center"  alignItems="center" >
              <CardActionArea component="a"  disabled href="#" >
                <Card sx={{ display: 'flex' }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Box
                      component="img"
                      sx={{ width: 180,alignContent:"center", alignItems:"center" }}
                      alt="image logo"
                      src="../../images/mobiswift.png"
                    />
                    <Typography variant="subtitle1"  color="text.secondary">
                    {t("common:mobiswifttitle")}
                    </Typography>
                    <Box
                      component="img"
                      sx={{ width: "auto", display: { xs: 'none', sm: 'block' } }}
                      alt="image l"
                      src="../../images/mobiswiftm.png"
                    />

                    <Typography variant="subtitle1" paragraph>
                    {t("common:mobiswiftdescription")}
                    </Typography>
                    <Box
                      component="img"
                      sx={{ width: 180, display: { xs: 'block', sm: 'none' } }}
                      alt="image b"
                      src="../../images/mobiswiftm.png"
                    />

                    <Typography variant="subtitle1" color="gray">
                    {/* {t("common:getstarted")} */}
                    </Typography>
                  </CardContent>

                </Card>
              </CardActionArea>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4} md={6} alignItems="center">
            <Grid container justifyContent="center" alignContent="center" >
              <CardActionArea component="a" disabled  href="#" >
                <Card sx={{ display: 'flex' }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Box
                      component="img"
                      sx={{ width: 180, }}
                      alt="image logo"
                      src="../../images/mobitv.png"
                    />
                    <Typography variant="subtitle1" color="text.secondary">
                    {t("common:mobitvtitle")}
                    </Typography>
                    <Box
                      component="img"
                      sx={{ width: "auto", display: { xs: 'none', sm: 'block' } }}
                      alt="image l"
                      src="../../images/mobitvm.png"
                    />

                    <Typography variant="subtitle1" paragraph>
                    {t("common:mobitvdescription")}
                    </Typography>
                    <Box
                      component="img"
                      sx={{ width: 180, display: { xs: 'block', sm: 'none' } }}
                      alt="image b"
                      src="../../images/mobitvm.png"
                    />

                    <Typography variant="subtitle1" color="gray">
                    {/* {t("common:getstarted")} */}
                    </Typography>
                  </CardContent>

                </Card>
              </CardActionArea>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4} md={6} alignItems="center">
            <Grid container justifyContent="center" alignContent="center" >
              <CardActionArea component="a" disabled  href="#" >
                <Card sx={{ display: 'flex' }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Box
                      component="img"
                      sx={{ width: 180, }}
                      alt="image logo"
                      src="../../images/mobistore.png"
                    />
                    <Typography variant="subtitle1" color="text.secondary">
                    {t("common:mobistoretitle")}
                    </Typography>
                    <Box
                      component="img"
                      sx={{ width: "auto", display: { xs: 'none', sm: 'block' } }}
                      alt="image l"
                      src="../../images/mobistorem.png"
                    />

                    <Typography variant="subtitle1" paragraph>
                    {t("common:mobistoredescription")}
                    </Typography>
                    <Box
                      component="img"
                      sx={{ width: 180, display: { xs: 'block', sm: 'none' } }}
                      alt="image b"
                      src="../../images/mobistorem.png"
                    />

                    <Typography variant="subtitle1" color="gray">
                    {/* {t("common:getstarted")} */}
                    </Typography>
                  </CardContent>

                </Card>
              </CardActionArea>

            </Grid>
          </Grid>
          <Grid item xs={12} sm={4} md={6} alignItems="center">
            <Grid container justifyContent="center" alignContent="center" >
              <CardActionArea component="a" disabled  href="#" >
                <Card sx={{ display: 'flex' }}>
                  <CardContent sx={{ flex: 1 }}>
                    <Box
                      component="img"
                      sx={{ width: 180, }}
                      alt="image logo"
                      src="../../images/mobigov.png"
                    />
                    <Typography variant="subtitle1" color="text.secondary">
                    {t("common:mobigovtitle")}
                    </Typography>
                    <Box
                      component="img"
                      sx={{ width: "auto", display: { xs: 'none', sm: 'block' } }}
                      alt="image l"
                      src="../../images/mobigovm.png"
                    />

                    <Typography variant="subtitle1" paragraph>
                    {t("common:mobigovdescription")}
                    </Typography>
                    <Box
                      component="img"
                      sx={{ width: 180, display: { xs: 'block', sm: 'none' } }}
                      alt="image b"
                      src="../../images/mobigovm.png"
                    />
                    <Typography variant="subtitle1" color="gray">
                    {/* {t("common:getstarted")} */}
                    </Typography>
                  </CardContent>
                </Card>
              </CardActionArea>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>

  );
}

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedPost;