import { Component } from '@angular/core';
import {
  Router, NavigationStart, NavigationEnd,
  NavigationCancel, NavigationError, Event
} from '@angular/router';
import { throwError } from 'rxjs';


import { AuthenticationService } from './services/authentication.service';
import { CrudService } from './services/crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
find:any={}
copyT:string
  title: any;
  Narr:any
  ques1:any
  constructor(public authService: AuthenticationService, private router: Router,
    public crudSer:CrudService )
   {  }
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

  navigator.clipboard.readText().then(
    clipText => document.getElementById("copy1").innerText = clipText)
    
    
}
   first(){
  let val=document.getElementById("copy1").innerText
      this.copyT=val
      console.log(this.copyT)
      
      var arr=this.copyT.split("\n\n");
      console.log(arr)


       this.ques1=arr[0]
      var option=arr[1]
      
      this.Narr=option.split("\n")

      console.log(this.Narr)

      for(let i in this.Narr){
        var x = document.createElement("INPUT");
        x.setAttribute("type", "checkbox");
       
         let k:any=1
          if (i=="1"){
            k=2
          }if(i=="2"){
            k=3
          }if(i=="3"){
            k=4
          }
          x.id="checkMate"+k
        
        var L= document.createElement('label')
        L.appendChild(document.createTextNode(k))

        let h=this.Narr[i]
         x.appendChild(document.createTextNode(`${h}`))
        document.getElementById('Div1').append(L,x)
       
      }

  
      
   }

   pushData(){
     let correct=[]
     let options1=[]

     let A=document.querySelector('#checkMate1')as HTMLInputElement
     let B=document.querySelector('#checkMate2')as HTMLInputElement
     let C=document.querySelector('#checkMate3')as HTMLInputElement
     let D=document.querySelector('#checkMate4')as HTMLInputElement
     console.log(A.checked)

     if (A.checked==true) {
       A=this.Narr[0]
        correct.push(A)
     }if (B.checked==true){
       B=this.Narr[1]
       correct.push(B)
     }if(C.checked==true){
       C=this.Narr[2]
       correct.push(C)
     }if(D.checked==true){
       D=this.Narr[3]
       correct.push(D)
     }
  if (A.checked==false) {
      A=this.Narr[0]
       options1.push(A)
    }if (B.checked==false){
      B=this.Narr[1]
      options1.push(B)
    }if(C.checked==false){
      C=this.Narr[2]
      options1.push(C)
    }if(D.checked==false){
      D=this.Narr[3]
      options1.push(D)
    }
    console.log(this.ques1)
    console.log(correct)
    console.log(options1)
    
         let data={}
     data["questionText"]=this.ques1
     data['correct']=correct
     data['option']=options1
  //  -----------------------------------
  this.crudSer.addData(data).then((result)=>
  {
    console.log(result)
    alert("data added")
  }).catch((err)=>{
    console.log(err)
  })
   }

}
