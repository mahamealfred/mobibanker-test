import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const featuredPosts = [
  {
    title: '../../Assets/images/mobiswift.png',
    date: 'PAYMENTS MADE SEAMLESS AND INVISIBLE',
    description:
      'Payments are becoming invisible. The next great evolution will see payment see payments fully disappear into simplified, holistic commerce platforms.',
    image: '../../Assets/images/mobiswiftm.png',
    imageLabel: 'Image Text',
  },
  {
    title: '../../Assets/images/mobigov.png',
    date: 'BRING USER-CENTERED DESIGN TO GOVERNMENT SERVICES.',
    description:
      'In this way the focus transforms from traditional administration to modern communication between governments and citizens or companies.',
    image: '../../Assets/images/mobigovm.png',
    imageLabel: 'Image Text',
  },
  {
    title: '../../Assets/images/mobistore.png',
    date: 'BUILD YOUR BRAND & CONQUER THE WOLRD',
    description:
      'Comlete FREE e-commerce module: marketplace, webshop & shopping cart, promotional price, stock management and Ads alerts.',
    image: '../../Assets/images/mobistorem.png',
    imageLabel: 'Image Text',
  },
  {
    title: '../../Assets/images/mobitv.png',
    date: 'LIVESTREAMING SHOPPING-THE NEXT BIG THING IN RETAIL COMMERCE',
    description:
      'Livestream shopping offers the ability to demonstrate and ultimately advertise products to a TV live, online audience that can interact and buy in that live experiance.',
    image: '../../Assets/images/mobitvm.png',
    imageLabel: 'Image Text',
  },
];
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
function FeaturedPost() {
  
  const [spacing, setSpacing] = React.useState(2);
  return (
    <React.Fragment>

          <Box sx={{ flexGrow: 1 }}>
          <Grid container alignItems="flex-start" padding={{xs: 6, md: 10}}  spacing={{ xs: 2, md: 6 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {featuredPosts.map((post) => (
              <Grid item xs={12} sm={4} md={6} key={post} alignItems="center">
                 <Grid container justifyContent="center" alignContent="center" >
                 <CardActionArea component="a" href="#" >
             <Card sx={{ display: 'flex' }}>
            <CardContent sx={{ flex: 1 }}>
            <Box
        component="img"
        sx={{
          width: 180,
        }}
        alt={post.imageLabel}
        src={post.title}
      />
            {/* <CardMedia
              component="img"
              sx={{ width: 180}}
              image={post.title}
              alt={post.imageLabel}
            /> */}
              {/* <Typography component="h2" variant="h5">
                 {post.title}
               </Typography> */}
               <Typography variant="subtitle1" color="text.secondary">
                 {post.date}
               </Typography>
               <Box
        component="img"
        sx={{ width:"auto", display: { xs: 'none', sm: 'block' } }}
        alt={post.imageLabel}
        src={post.image}
      />
               {/* <CardMedia
              component="img"
              sx={{ width:"auto", display: { xs: 'none', sm: 'block' } }}
              image={post.image}
              alt={post.imageLabel}
            /> */}
               <Typography variant="subtitle1" paragraph>
                 {post.description}
               </Typography>
               <Box
        component="img"
        sx={{ width: 180, display: { xs: 'block', sm: 'none' } }}
        alt={post.imageLabel}
        src={post.image}
      />
               {/* <CardMedia
              component="img"
              sx={{ width: 180, display: { xs: 'block', sm: 'none' } }}
              image={post.image}
              alt={post.imageLabel}
            /> */}
               <Typography variant="subtitle1" color="gray">
                 Get strated
               </Typography>
             </CardContent>
            
          </Card>
        </CardActionArea>
                 {/* <Item>{post.description}</Item> */}
                  </Grid>
               
              </Grid>
            ))}
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