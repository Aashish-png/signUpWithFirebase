import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  showData:any=[]
  curruntUser:any=[]
  msg:string
  id:string
  constructor(private route:ActivatedRoute, private router:Router,public curdservice:CrudService) { 
     debugger
    this.route.params.subscribe((res)=>{
      this.showData.id=res['id']
      
    })
    
  }

  ngOnInit(): void {
    
      this.id=this.showData.id

      this.curdservice.edit(this.id).then((res)=>{
        this.showData=res
      })
       
  }

  UpdateData(id:any){
    let record={};
  debugger
  record['id']=id;
  record['name']=this.showData.name;
  record['email']=this.showData.email;
  record['mobile']=this.showData.mobile;
  record['city']=this.showData.city;
  
  this.curdservice.Update(record).then((res)=>{
    this.showData.name="";
    this.showData.email="";
    this.showData.mobile=undefined;
    this.showData.city="";
    console.log(res)
    this.msg="data Updated"
  }).catch(err=>{
    console.log(err);
  })
  
    
  
  }
}
