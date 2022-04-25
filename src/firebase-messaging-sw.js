importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js');
//importScripts('core/decoder.js');

import { getMessaging } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";
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
//firebase.firestore().settings({ experimentalForceLongPolling: true }); //add this..
const messaging = firebase.messaging();

messaging.getToken({ vapidKey: "BJdDflmMUruZ_8VQuzUNu9NzJ8p_KuIp7gsYqyTbiHuuUyCmoW_fYUGJvyDpeziPrFu0hSxwC29VrPmoX6V2RCI" });


// //var decoder = new Decoder();
// messaging.setBackgroundMessageHandler(function (payload) {
//   var data = payload || {};
//   var shinyData = decoder.run(data);

//   console.log('[firebase-messaging-sw.js] Received background message ', payload, shinyData);

//   return self.registration.showNotification(shinyData.title,s {
//     body: shinyData.body,
//     icon: shinyData.icon,
//     data: { url: shinyData.tag }
//   })
// });


onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});

// self.addEventListener('notificationclick', function (event) {
//   console.log('On notification click: ', event.notification.data.url);
//   // Android doesn’t close the notification when you click on it
//   // See: http://crbug.com/463146
//   event.notification.close();

//   // This looks to see if the current is already open and
//   // focuses if it is
//   console.log('Notification click: data.url ', event.notification.data.url);
//   event.notification.close();
//   var url = /localhost:5033|angular-sign-up-49cdf.firebaseapp.com/;
//   var newurl = "/chat";
//   if (event.notification.data.url) {
//     newurl = event.notification.data.url;
//   }

//   function endsWith(str, suffix) {
//     return str.indexOf(suffix, str.length - suffix.length) !== -1;
//   }

//   event.waitUntil(
//     clients.matchAll({
//       type: 'window'
//     })
//       .then(function (windowClients) {
//         for (var i = 0; i < windowClients.length; i++) {
//           var client = windowClients[i];
//           if (url.test(client.url) && 'focus' in client) {
//             if (endsWith(client.url, "/app.html#" + newurl)) {
//               console.log("******** Yes it matched *******");
//               return client.focus();
//             }
//             return client.navigate("/app.html#" + newurl)
//               .then(client => client.focus());
//           }
//         }
//         if (clients.openWindow) {
//           return clients.openWindow("/app.html#" + newurl);
//         }
//       })
//   );

// });


