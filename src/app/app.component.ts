import { Component } from '@angular/core';
import {
  Router, NavigationStart, NavigationEnd,
  NavigationCancel, NavigationError, Event
} from '@angular/router';


import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
find:any={}
  
  constructor(public authService: AuthenticationService, private router: Router,) {  }
Find:any




logout() {
  this.authService.logout().subscribe(() => {
      this.router.navigate(['']);
  })
}
search(){
  debugger
  
this.Find=this.find.url
console.log(this.Find)

let doc:any=document.getElementById('frm')
doc.src=this.Find
}

// ****************************
copy(){
  debugger
  // let ifrm=document.getElementById('frm')
  
  //   copyText(ifrm)
  navigator.clipboard.readText().then(
    clipText => document.getElementById("copy1").innerText = clipText);
  
}


}
// function copyText(HTMLElement){

//   let elementText=HTMLElement.innerText
//   let inputElement=document.createElement('input')
//   inputElement.setAttribute('value',elementText);
//   document.body.appendChild(inputElement)

//   document.execCommand('copy');

// }

