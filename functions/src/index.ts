

import * as functions from "firebase-functions";
import * as admin from "firebase-admin"




var serviceAccount = require("E:/angular/angular-sign-up/assd.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

//admin.initializeApp();



exports.notification = functions.firestore
  .document('access/{docId}')
  .onUpdate( (change, context) => { 

 //console.log("function runs",change.after.data())
let id = context.params.docId
 const oldvalue=change.before.data();
//console.log("old values ="+ oldvalue)
const newValue=change.after.data();
//console.log("New value =" + newValue)

console.log(newValue.isDeleted)
if(newValue===oldvalue){return }

const payload={
  notification:{
    title:  "hello there new notify",
    body: "this is body"

  }
  
};

//to get tokenn
//const databaseRoot=functions.firestore.('access/{docId}/token')
// try {
  
const db=admin.firestore()
 const database=db.collection(`access/${id}/users` ).doc(newValue.quizId).get();
 
 database.then((snapshot)=>{
   console.log("newS==>"+snapshot.data())
        
const fcmt=  snapshot.get('token')       //  snapshot.get('token')
console.log(fcmt)
console.log(payload)
  return admin.messaging().sendToDevice(fcmt,payload).then(res=>{              
    console.log('notification sent ==> '+res)                   
    }).catch(err=>{                                     
    console.log('notification sent !==:(> '+err)            
    })

})

// } catch (error) {

// console.log(error)
// }
});

// exports.randomNumber= functions.https.onRequest((request,Response)=>{
//   const number = Math.round(Math.random()*100);
//   Response.send(number.toString());
// }) 

// exports.toDoreDirect= functions.https.onRequest((request,Response)=>{
 
//   Response.redirect('https://github.com/')
// }) 

//http callable functions


// exports.sayHello= functions.https.onCall((data,context)=>{
//   return `hello people`
// })
///https on request
// exports.api= functions.https.onRequest((req,res)=>{

//   switch(req.method){
//     case 'GET':
//       res.send('it was a get request');
//       break;
//     case 'POST':
//       const body=req.body;
//       res.send(body)
//       break;
//     case 'DELETE':
//       res.send('it was a delete request')
//       break;
//     default:
//       res.send('it was a default request ')        
//   }

// }) 