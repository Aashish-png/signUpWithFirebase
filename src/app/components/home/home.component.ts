import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
// import { dataObj } from 'src/app/data';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { identifierName } from '@angular/compiler';
import { doc } from 'firebase/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  msg:string
  // showData:dataObj;
   showData:any=[]
  constructor(private router:Router,public crudSer:CrudService) {
    
   }

  ngOnInit(): void {
  }


  saveData(){
  let record={};
  debugger
  
  record['name']=this.showData.name;
  record['email']=this.showData.email;
  record['mobile']=this.showData.mobile;
  record['city']=this.showData.city;
  
  
  this.crudSer.create_newStudent(record).then(res=>{
    
    this.showData.name="";
    this.showData.email="";
    this.showData.mobile=undefined;
    this.showData.city="";
    console.log(res)
    this.msg="data Added"
  }).catch(err=>{
    console.log(err);
  })

  }
  
 

  
  }