importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js');

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAmsHJ5KyZKLCjIPAYab6n7LoDucqfdRJQ",
    authDomain: "angular-sign-up-49cdf.firebaseapp.com",
    projectId: "angular-sign-up-49cdf",
    storageBucket: "angular-sign-up-49cdf.appspot.com",
    messagingSenderId: "1061240606453",
    appId: "1:1061240606453:web:933e5c62a4cf557cea3fbc",
    vapidKey: "BJdDflmMUruZ_8VQuzUNu9NzJ8p_KuIp7gsYqyTbiHuuUyCmoW_fYUGJvyDpeziPrFu0hSxwC29VrPmoX6V2RCI",

  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const messaging = firebase.messaging();

  messaging.getToken({vapidKey: "BJdDflmMUruZ_8VQuzUNu9NzJ8p_KuIp7gsYqyTbiHuuUyCmoW_fYUGJvyDpeziPrFu0hSxwC29VrPmoX6V2RCI"});
