import { Component, OnInit } from '@angular/core';
// import { dataObj } from 'src/app/data';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';


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

//***********************save data********************** */
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
    this.msg=('data added')
    //this.router.navigate(['/show'])
    alert("Data added")
  }).catch(err=>{
    console.log(err);
  })

  }
  
 

  
  }