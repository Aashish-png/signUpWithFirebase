import * as functions from "firebase-functions";
import * as admin from "firebase-admin"

var serviceAccount = require("E:/angular/angular-sign-up/assd.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

//admin.initializeApp();
//export a noitification firebase functions

const db=admin.firestore()

exports.createUser = functions.firestore
    .document('accesses/{accessId}')
    .onCreate(async (snap, context) => {
      
      const newValue = snap.data();//get data in form of object
      const quizId  =  newValue.quizId     //get quizId and contentId from accesses
      const contentId= newValue.contentId
      
      let notifypermission:any=await Getuser(contentId)
     console.log("true===>>>"+notifypermission.notification)
if(notifypermission.notification==true){
     
    let quizDetails:any=await getQuizdetails( contentId, quizId);//return a promise
      
      console.log("qz==>"+quizDetails)
      console.log("name==>"+quizDetails.quizName)//quiz  name
 
 
    if(quizDetails && quizDetails.quizName ){         //check for value 
         const database=db.collection(`user` ).doc(contentId).get();
 
          database.then( (snapshot)=>{
          console.log("newS==>"+snapshot.data())
 

 
          const fcmt=  snapshot.get('token')     //get token from user collections  
          console.log(fcmt)
          console.log("THIS IS =>"+quizDetails)

        //store notification value 
          console.log("quizvalue==> "+quizDetails+ " fcmt==> "+fcmt)
      const payload={
              notification:{
                     title: quizDetails.quizName,
                      body: `body`,

           }
        };
        console.log(payload)
            return admin.messaging().sendToDevice(fcmt,payload).then(res=>{      //sending msg to app           
              console.log('notification sent ==> '+res)                   
                }).catch(err=>{                                     
              console.log('notification sent !==:(> '+err)            
               })
   //   }
    })
  }
 }
})



    

///------------function definations----------------
function getQuizdetails(contentId:any,quizId: any) {
  return new Promise(async (resolve, rejects) => {

  const db=admin.firestore()

  // const database=
  db.collection(`contentAccountMapping/${contentId}/quiz` ).doc(quizId).get().then((result)=>{

        console.log("Result==>>"+result.data())
        resolve(result.data())
      
  }).catch((res)=>{

    console.log("catch==>"+res)
    rejects(res)
  })
})
}
  ///getuser setting 

function Getuser(contentId:any){
  return new Promise(async (resolve, rejects) => {
  const db=admin.firestore()
  db.collection(`user/${contentId}/userSetting`).doc(contentId).get().then((result)=>{
        console.log("ture or =>"+result);
        resolve(result.data())
  }).catch((err)=>{
    rejects(err)
    console.log("err==>"+err);
  })

})
}









// function getUserDetails(contentId: any) {
//   const db=admin.firestore()
//   const database1=db.collection(`user/${contentId}` ).doc(contentId).get();
//    database1.then((Result1)=>{
//      return Result1.get('token')
//    })
// }
    // }
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