import * as functions from "firebase-functions";


// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.randomNumber= functions.https.onRequest((request,Response)=>{
  const number = Math.round(Math.random()*100);
  Response.send(number.toString());
}) 

exports.toDoreDirect= functions.https.onRequest((request,Response)=>{
 
  Response.redirect('https://github.com/')
}) 

//http callable functions


exports.sayHello= functions.https.onCall((data,context)=>{
  return `hello people`
})
///https on request
exports.api= functions.https.onRequest((req,res)=>{

  switch(req.method){
    case 'GET':
      res.send('it was a get request');
      break;
    case 'POST':
      const body=req.body;
      res.send(body)
      break;
    case 'DELETE':
      res.send('it was a delete request')
      break;
    default:
      res.send('it was a default request ')        
  }

}) 