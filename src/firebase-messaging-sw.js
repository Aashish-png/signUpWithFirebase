importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAmsHJ5KyZKLCjIPAYab6n7LoDucqfdRJQ",
    authDomain: "angular-sign-up-49cdf.firebaseapp.com",
    projectId: "angular-sign-up-49cdf",
    storageBucket: "angular-sign-up-49cdf.appspot.com",
    messagingSenderId: "1061240606453",
    appId: "1:1061240606453:web:933e5c62a4cf557cea3fbc"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

const messaging = firebase.messaging()
