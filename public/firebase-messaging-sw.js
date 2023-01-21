// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyCMUCEjpLmhS_P08wPQTUuc1f13LxOoc14",
  authDomain: "mobibanker.firebaseapp.com",
  projectId: "mobibanker",
  storageBucket: "mobibanker.appspot.com",
  messagingSenderId: "685062397259",
  appId: "1:685062397259:web:81a370d9b61480e105dcce"


};

firebase.initializeApp(firebaseConfig);
// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
 // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,notificationOptions);
});