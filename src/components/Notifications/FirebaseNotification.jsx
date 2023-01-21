import React, {useState, useEffect} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { requestForToken, onMessageListener } from './firebase';

const FireNotification = () => {
  const [notification, setNotification] = useState({title: '', body: '',iconUrl:'',actionUrl:''});
  const notify = () =>  toast(<ToastDisplay/>);
  function ToastDisplay() {
    return (
      <div>
            <p><a href="#"><u>GTBank Withdrawal </u></a></p>
        <img src={notification?.iconUrl}/>
        <p><b>{notification?.title}</b></p>
        <p>{notification?.body}</p>
        <p><a href="#"><u>Check Withdrawal</u></a></p>
       
      </div>
    );
  };

  useEffect(() => {
    if (notification?.title ){
     notify()
    }
  }, [notification])

  requestForToken();

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