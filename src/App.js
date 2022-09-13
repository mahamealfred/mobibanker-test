import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';
import './App.css';
import TopNav from './components/topNav/TopNav';
import SignIn from './pages/signin/SignIn';

function App() {

  // const BlueButton=styled(Button)(({theme})=>({
  //   backgroundColor:'skyblue',
  //   color:'#888',
  //   margin:5,
  //   "&:hover":{
  //     backgroundColor:"lightblue"
  //   }
  // }))
  return (
    <Box>
      <TopNav/>
      <SignIn/>
    </Box>
  );
}

export default App;
