import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import axios from "axios"
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
  console.log('current token for client: ', currentToken);
  // axios.post('/user', {
  //   firstName: 'Fred',
  //   lastName: 'Flintstone'
  // })
  // .then(function (response) {
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
}


export const requestForToken = () => {
  return getToken(messaging, { vapidKey: "BCRXAB_cAzgDe1yPgi5KMrU12j9jjOSwLeW_pVsshrW4kMc3KMczyhoV_RO6FiCphN1Y48RQzoahMnikBP7Uw_4"})
    .then((currentToken) => {
      if (currentToken) {
      
        sendToken({currentToken})
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
      console.log("payload", payload)
      resolve(payload);
    });
  });