import * as functions from "firebase-functions";
import * as admin from "firebase-admin"



var serviceAccount = require("E:/angular/angular-sign-up/assd.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

//admin.initializeApp();
//export a noitification firebase functions



exports.createUser = functions.firestore
    .document('accesses/{accessesId}')
    .onCreate((snap, context) => {
      // Get an object representing the document
      // e.g. {'name': 'Marie', 'age': 66}
      const newValue = snap.data();
      const id=context.params.accessesId

      console.log(newValue)
      console.log(id)

      const quizId=newValue.quizId
      const contentId= newValue.contentId

      let quizDetails=getQuizdetails( contentId, quizId);//get the name 
       
      console.log(quizDetails)

      let userDetails=getUserDetails(contentId)//get the token
      console.log(userDetails)
    
      //store notification value 
const payload={
  notification:{
    title: `${quizDetails}`,
    body: "this is body",

  }
};
const db=admin.firestore()
 const database=db.collection(`users` ).doc(contentId).get();
 
 database.then((snapshot)=>{
   console.log("newS==>"+snapshot.data())
        
const fcmt=  snapshot.get('token')       
console.log(fcmt)
console.log(payload)
  return admin.messaging().sendToDevice(fcmt,payload).then(res=>{      //sending msg to app           
    console.log('notification sent ==> '+res)                   
    }).catch(err=>{                                     
    console.log('notification sent !==:(> '+err)            
    })

    
    });
  })

///------------function definations----------------
function getQuizdetails(contentId:any,quizId: any) {
  const db=admin.firestore()

  const database=db.collection(`contentAccountMapping/${contentId}/quiz` ).doc(quizId).get();
  
  database.then((result)=>{
          let v= result.get('quizName')
          return v
  })
}

function getUserDetails(contentId: any) {
  const db=admin.firestore()
  const database1=db.collection(`users/${contentId}` ).doc(contentId).get();
   database1.then((Result1)=>{
     return Result1.get('token')
   })
}
    
//_-------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------
//****************************************************onUpdatefunction********************* */
// exports.notification = functions.firestore
//   .document('accesses/{docId}')
//   .onUpdate( (change, context) => { 

// let id = context.params.docId
//  const oldvalue=change.before.data();
// //console.log("old values ="+ oldvalue)
// const newValue=change.after.data();
// //console.log("New value =" + newValue)

// console.log(newValue.isDeleted)
// if(newValue===oldvalue){return }//check if data has changed 

// //store notification value 
// const payload={
//   notification:{
//     title:  "this is title ",
//     body: newValue.email,

//   }
  
// };

// // get the stored token form firebstore
  
// const db=admin.firestore()
//  const database=db.collection(`access/${id}/users` ).doc(newValue.quizId).get();
 
//  database.then((snapshot)=>{
//    console.log("newS==>"+snapshot.data())
        
// const fcmt=  snapshot.get('token')       
// console.log(fcmt)
// console.log(payload)
//   return admin.messaging().sendToDevice(fcmt,payload).then(res=>{      //sending msg to app           
//     console.log('notification sent ==> '+res)                   
//     }).catch(err=>{                                     
//     console.log('notification sent !==:(> '+err)            
//     })

// })


// });

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