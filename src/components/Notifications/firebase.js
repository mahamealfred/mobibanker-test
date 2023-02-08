import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import axios from "axios"
import { useContext } from 'react';
import AuthContext from '../../context';

// Replace this firebaseConfig object with the congurations for the project you created on your firebase console. 
const firebaseConfig = {

    apiKey: "AIzaSyCMUCEjpLmhS_P08wPQTUuc1f13LxOoc14",
    authDomain: "mobibanker.firebaseapp.com",
    projectId: "mobibanker",
    storageBucket: "mobibanker.appspot.com",
    messagingSenderId: "685062397259",
    appId: "1:685062397259:web:81a370d9b61480e105dcce"
 
  };
  

initializeApp(firebaseConfig);

const messaging = getMessaging();
const sendToken=async(token)=>{
  const {currentToken}=token
  const {agentId}=token

  if(agentId){
 await axios.post('https://agencybank.mobicash.rw/api/banking/finance/rest/v.4.14.01/save-token', {
    agent_id:agentId.replace(/[^a-zA-Z0-9 ]/g, ''),
    device_token:currentToken
  })
  .then(function (response) {
return response
  })
  .catch(function (error) {
   return error
  });
  }
}


export const RequestForToken = () => {
  const {auth}=useContext(AuthContext)
  return getToken(messaging, { vapidKey: "BCRXAB_cAzgDe1yPgi5KMrU12j9jjOSwLeW_pVsshrW4kMc3KMczyhoV_RO6FiCphN1Y48RQzoahMnikBP7Uw_4"})
    .then((currentToken) => {
      if (currentToken) {
      
        sendToken({currentToken,agentId:auth.phonenumber})
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
   
      
      resolve(payload);
    });
  });