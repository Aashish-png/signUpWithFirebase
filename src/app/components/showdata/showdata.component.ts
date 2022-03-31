import { Component, OnInit } from '@angular/core';
// import { dataObj } from 'src/app/data';

//import { Firestore, getDoc, getDocs, collection, doc } from '@angular/fire/firestore';
import { CrudService } from 'src/app/services/crud.service';
import { resolve } from 'dns';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';



@Component({
  selector: 'app-showdata',
  templateUrl: './showdata.component.html',
  styleUrls: ['./showdata.component.css']
})
export class ShowdataComponent implements OnInit {
  dataSource: any
  showData: any = []
  empty: any = []
  i:any
  j:any
  //set:any=new Set()
  constructor(public crudservice: CrudService, private router: Router) {
  
    

  }

  ngOnInit(): void {
    
  
  this.j =1
      
    this.crudservice.getData(this.j).then((result: any) => {
      this.showData = result
  
      
      console.log(result)
    }).catch((err) => {

      console.log(err)

    })
    console.log('call')
    debugger
   
  
      
  }

 


  ///delete data function 
  DeleteData(doc_id: any) {
    let isExecuted = confirm("Are you sure ?");
    
    if(isExecuted==true){
    this.crudservice.deleteData(doc_id)
    console.log(this.showData.findIndex((a:any)=>a.id==doc_id))
    this.showData.splice(this.showData.findIndex((a:any)=>a.id==doc_id),1);
    }
    
  }


///***************************Next************************ 
next(){
   debugger

   let g=this.showData[this.showData.length-1]

  this.crudservice.getData(g.timeS)  
  .then((result: any) => {
    if (result.length==0){
      this.i="End of the table"
    }
    this.showData = result
  this.j=undefined
    console.log(result)
  }).catch((err) => {

    console.log(err)

  })
  console.log('callNext')
  debugger
 
}

// ***********prev*****************

prev(){
  let g=0

  this.crudservice.getData(g)  
  .then((result: any) => {
   this.i=""
    this.showData = result
  
    console.log(result)
  }).catch((err) => {

    console.log(err)

  })
  console.log('callNext')
  debugger
}







}