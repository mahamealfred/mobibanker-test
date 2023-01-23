import React, {useState, useEffect, useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { RequestForToken, onMessageListener } from './firebase';
import NotificationSound from "../../assets/audio/notification-sound.wav";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FireNotification = () => {
  const [notification, setNotification] = useState({title: '', body: '',iconUrl:'',actionUrl:''});
  const notify = () =>  toast(<ToastDisplay/>);
  const audioPlayer = useRef(null);
  function playAudio(){
    audioPlayer.current.play();
  }
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };



  function ToastDisplay() {
    return (
      <Stack spacing={2} sx={{ width: '100%' }}>
      <Alert severity="success" sx={{backgroundColor:"#FEA64B"}}><p><b>{notification?.title}</b></p></Alert>
    </Stack>

  //  <div>
  //           <p><a href="#"><u>GTBank Withdrawal </u></a></p>
  //       <img src={notification?.iconUrl}/>
  //       <p><b>{notification?.title}</b></p>
  //       <p>{notification?.body}</p>
  //       <audio ref={audioPlayer} src={NotificationSound} />
  //       <p><a href="#"><u>Check Withdrawal</u></a></p>
    
     
  //     </div>
    
   
    );
  };

  useEffect(() => {
    if (notification?.title ){
     notify()
    }
  
  }, [notification])

  RequestForToken();

  onMessageListener()
    .then((payload) => {
     
      setNotification({title: payload?.notification?.title, body: payload?.notification?.body,iconUrl: payload?.notification?.icon,actionUrl: payload?.notification?.click_action});     
 
    })
    .catch((err) => console.log('failed: ', err));

  return (
     <Toaster/>
  )
}

export default FireNotification