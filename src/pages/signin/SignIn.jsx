import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Widget from '../../components/widget/Widget';
import NativeSelect from '@mui/material/NativeSelect';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TopNav from '../../components/topNav/TopNav';
import { useHistory } from 'react-router-dom';
const SignIn = () => {
  const history=useHistory()
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          username: data.get('username'),
          password: data.get('password'),
        });
    history.push('dashboard',{push:true})
      };
      const theme = createTheme();
  return (
    <React.Fragment>
      <TopNav/>
      <ThemeProvider theme={theme}>
    <Grid container component="main" sx={{ height: '80vh', backgroundColor:'primary' }}>
      
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square
      sx={{
        backgroundRepeat: 'no-repeat',
        backgroundColor: (t) =>
          t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      >
        <Box
          sx={{
            my: 12,
            mx: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
           
          }}
        >
          <Typography component="h1" variant="h5"
         
          >
            Sign In
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="warning"
              sx={{ mt: 3, mb: 2 }}
             
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Terms and conditions"}
                </Link>
              </Grid>
            </Grid>
           {/* <Grid  container>
           <Grid item >
            <Box sx={{ minWidth: 40 }}>
          <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
        </InputLabel>
        <NativeSelect
          defaultValue={10}
          inputProps={{
            name: 'age',
            id: 'uncontrolled-native',
          }}
        >
          <option value={10}>Kinyarwanda</option>
          <option value={20}>English</option>
          <option value={30}>French</option>
        </NativeSelect>
      </FormControl>
        </Box>
            </Grid>
           </Grid> */}  
          </Box>
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
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
      <Widget/>
        </Grid>
    </Grid>
    
  </ThemeProvider>
    </React.Fragment>
   
  )
}

export default SignIn