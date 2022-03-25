import { Component, OnInit } from '@angular/core';
// import { dataObj } from 'src/app/data';

import { Firestore, getDoc, getDocs, collection, doc } from '@angular/fire/firestore';
import { CrudService } from 'src/app/services/crud.service';
import { resolve } from 'dns';
import { Router } from '@angular/router';


@Component({
  selector: 'app-showdata',
  templateUrl: './showdata.component.html',
  styleUrls: ['./showdata.component.css']
})
export class ShowdataComponent implements OnInit {
  dataSource: any
  showData: any = []
  empty: any = []


  constructor(public crudservice: CrudService, private router: Router) {


  }

  ngOnInit(): void {
    /////
    this.showData = this.empty
    this.crudservice.getData().then((result: any) => {
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
    debugger
    this.crudservice.deleteData(doc_id)
    this.showData.splice(this.showData.findIndex((a:any)=>a.Id==doc_id),1);
    // this.crudservice.getData()
    // .then((result:any)=>{
    //   this.showData=this.empty
    //   this.showData=result
    //   console.log(result)
    //  }).catch((err) => {

    //    console.log(err)

    //  })


  }


  // **************************************





  // Update(id:string){
  //   this.router.navigate(['/home']);


  // }


}