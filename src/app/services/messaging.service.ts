import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
//import { getMessaging } from "firebase/messaging/sw";

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  constructor(public fireMsg:AngularFireMessaging) { }

requstPer(_username:string){
  debugger
  this.fireMsg.requestToken.subscribe((token)=>{
    console.log(token)
  }),
  (err)=>{
    console.error("No permission"+ err);
  }
}

}
