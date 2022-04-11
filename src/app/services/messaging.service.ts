// import { Injectable } from '@angular/core';
// import { AngularFireMessaging } from '@angular/fire/compat/messaging';
// //import { getMessaging } from "firebase/messaging/sw";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";
// import { environment } from 'src/environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class MessagingService {
//   message: any;

//   constructor(public fireMsg:AngularFireMessaging) { }

// // requstPer(_username:string){
// //   debugger
// //   this.fireMsg.requestToken.subscribe((token)=>{
// //     console.log(token)
// //   }),
// //   (err)=>{
// //     console.error("No permission"+ err);
// //   }
// // }

// requestPermission() {

//   const messaging = getMessaging();

//   getToken(messaging, { vapidKey: environment.firebase.apiKey }).then((currentToken) => {
//     if (currentToken) {
//       console.log("Hurraaa!!! we got the token.....")
//       console.log(currentToken);
//       // Send the token to your server and update the UI if necessary
//       // ...
//     } else {
//       // Show permission request UI
//       console.log('No registration token available. Request permission to generate one.');
//       // ...
//     }
//   }).catch((err) => {
//     console.log('An error occurred while retrieving token. ', err);
//     // ...
//   });

  

// }

// listen() {
//   const messaging = getMessaging();
//   onMessage(messaging, (payload) => {
//     console.log('Message received. ', payload);
//     this.message=payload;
//   });
// }
// }
