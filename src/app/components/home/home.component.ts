import { Component, OnInit } from '@angular/core';
// import { dataObj } from 'src/app/data';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import {
  getDownloadURL,
  getStorage,
  ref,
  Storage,
  uploadBytes,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { HotToastService } from '@ngneat/hot-toast';
import { MessagingService } from 'src/app/services/messaging.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  msg:any
  // showData:dataObj;
   showData:any=[]
  filePath: string;
  file: any={}
  f:any
  constructor(private router:Router,public crudSer:CrudService,public store:Storage,
    public toast:HotToastService) {
    
   }

  ngOnInit(): void {
  
    this.f=1
  }

//***********************save data********************** */
  saveData(){   
  let record={};
  this.showData.time=Date.now()
  debugger
  
  record['name']=this.showData.name;
  record['email']=this.showData.email;
  record['mobile']=this.showData.mobile;
  record['city']=this.showData.city;
  record['url']=this.showData.url;
record['timeS']=this.showData.time
  
  
  this.crudSer.create_newStudent(record).then(res=>{
    
    this.showData.name="";
    this.showData.email="";
    this.showData.mobile=undefined;
    this.showData.city="";
    console.log(res)
    //this.msg=('data added')
    this.router.navigate(['/show'])
    alert("Data added")
  }).catch(err=>{
    console.log(err);
    this.msg=err
  })

  }
  
  chooseFile(event:any){
    this.file= event.target.files[0]
    console.log(this.file)
    this.f=undefined
  }

  upload(){

    debugger
    const storage = getStorage();
    const storageRef = ref(storage,  this.file.name);
   // 
    const uploadTask = uploadBytesResumable(storageRef, this.file);
    
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.msg=progress+'% done'
        console.log('Upload is ' + progress + '% done');
        
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        console.log(error)
        this.msg=error
        // Handle unsuccessful uploads
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);

           this.showData.url=downloadURL
        });
      }
    );
  }


 
    
  }