import { Component, OnInit } from '@angular/core';
import {
  getDownloadURL,
  getStorage,
  ref,
  Storage,
  uploadBytes,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { environment } from "../environments/environment";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import {
  Router, NavigationStart, NavigationEnd,
  NavigationCancel, NavigationError, Event
} from '@angular/router';
import { onBackgroundMessage } from "firebase/messaging/sw";

import { AuthenticationService } from './services/authentication.service';
import { CrudService } from './services/crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  find: any = {}
  copyT: string
  title: any;
  Narr: any
  ques1: any
  file: any;
  Ufile: string;
  msg: any;
  Dis: any;
  message: any;

  constructor(public authService: AuthenticationService, private router: Router,
    public crudSer: CrudService,) { }
  Find: any


  ngOnInit(): void {
    debugger
    this.requestPermission()
    this.listen()
    this.listen2()


  }
   //for logout  in  authentication
   logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['']);
    })
  }

  ///for notifucations token

  requestPermission() {

    const messaging = getMessaging();

    // messaging.getToken({vapidKey: "BKagOny0KF_2pCJQ3m....moL0ewzQ8rZu"});

    getToken(messaging, { vapidKey: environment.firebase.vapidKey }).then((currentToken) => {
      if (currentToken) {
        console.log("Hurraaa!!! we got the token.....")
        console.log(currentToken);

        // Send the token to your server and update the UI if necessary
        // ...
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });

  }
  /////listen
  listen() {
    const messaging = getMessaging();

    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message = payload;
    });
  }

  /////back listen
  listen2() {
    const messaging = getMessaging();
    onBackgroundMessage(messaging, (payload) => {
      console.log('[firebase-messaging-sw.js] Received background message ', payload);
      // Customize notification here
      const notificationTitle = 'Background Message Title';
      const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
      };
      this.message = payload
      console.log(this.message)

      // this.registration.showNotification(notificationTitle,
      //   notificationOptions);
    });
  }

 
  // when we click go button this fucntion runs
  search() {
    debugger

    this.Find = this.find.url
    console.log(this.Find)

    let doc: any = document.getElementById('frm')
    doc.src = this.Find
  }



  // ****************************Export buttom***********************
  copy() {
    debugger

    navigator.clipboard.readText().then(
      clipText => document.getElementById("copy1").innerText = clipText)

    if (this.Dis == 1) {
      let X = document.getElementById('checkMate1')
      X.remove();
      let Y = document.getElementById('checkMate2')
      Y.remove();
      let Z = document.getElementById('checkMate3')
      Z.remove();
      let W = document.getElementById('checkMate4')
      W.remove();

    }
    this.Dis = undefined
  }
  //------------------Get Ans-----------------------------
  first() {
    debugger
    let val = document.getElementById("copy1").innerText
    this.copyT = val
    console.log(this.copyT)

    //split the div content
    var arr = this.copyT.split("\n\n");
    console.log(arr)


    this.ques1 = arr[0]
    var option = arr[1]
    if (option == undefined) {
      alert("Export the correct data first ")
    }
    //---------------split the options ----------------

    this.Narr = option.split("\n")

    console.log(this.Narr)

    ////--------------Create checkBox ---------------

    for (let i in this.Narr) {
      var x = document.createElement("INPUT");
      x.setAttribute("type", "checkbox");

      let k: any = 1
      if (i == "1") {
        k = 2
      } if (i == "2") {
        k = 3
      } if (i == "3") {
        k = 4
      }
      x.id = "checkMate" + k

      // var L = document.createElement('label')
      // L.id = "L1" + k
      // L.appendChild(document.createTextNode(k))

      let h = this.Narr[i]
      x.appendChild(document.createTextNode(`${h}`))
      document.getElementById('inputDiv').append(x)
      this.Dis = 1

      document.getElementById('inputDiv').style.display = "table-caption";
    }



  }
  //---------Push data to database -------------
  pushData() {
    debugger
    let correct = []
    let options1 = []

    let A = document.querySelector('#checkMate1') as HTMLInputElement
    if (A == null) {
      alert("No data to send, get the Data first")
    }
    let B = document.querySelector('#checkMate2') as HTMLInputElement
    let C = document.querySelector('#checkMate3') as HTMLInputElement
    let D = document.querySelector('#checkMate4') as HTMLInputElement
    console.log(A.checked)

    if (A.checked == true) {
      A = this.Narr[0]
      correct.push(A)
    } if (B.checked == true) {
      B = this.Narr[1]
      correct.push(B)
    } if (C.checked == true) {
      C = this.Narr[2]
      correct.push(C)
    } if (D.checked == true) {
      D = this.Narr[3]
      correct.push(D)
    }

    for (let i in this.Narr) {
      if (i == "0") {
        A = this.Narr[0]
        options1.push(A)
      }
      if (i == "1") {
        B = this.Narr[1]
        options1.push(B)
      }
      if (i == "2") {
        C = this.Narr[2]
        options1.push(C)
      }
      if (i == "3") {
        D = this.Narr[3]
        options1.push(D)
      }
    }


    console.log(this.ques1)
    console.log(correct)
    console.log(options1)

    let data = {}
    data["questionText"] = this.ques1
    data['correct'] = correct
    data['option'] = options1

    if (correct.length == 0) {
      alert("plsese select the corect ans then proceed ")
    }
    //  -----------------------using Services-------------- 
    if (correct.length != 0) {
      this.crudSer.addData(data).then((result) => {
        console.log(result)
        alert("data added")

        ///-------------destroying the input elements and labels----------------
        let X = document.getElementById('checkMate1')
        X.remove();
        let Y = document.getElementById('checkMate2')
        Y.remove();
        let Z = document.getElementById('checkMate3')
        Z.remove();
        let W = document.getElementById('checkMate4')
        W.remove();

        // let P = document.getElementById('L11')
        // P.remove()
        // let Q = document.getElementById('L12')
        // Q.remove()
        // let R = document.getElementById('L13')
        // R.remove()
        // let S = document.getElementById('L14')
        // S.remove()

        this.Dis = undefined

      }).catch((err) => {
        console.log(err)
      })
    }
  }


  //-----------------Uplaod functions---------------------

  chooseFile(event: any) {
    debugger
    this.file = event.target.files[0]
    console.log(this.file)
    //this.f=undefined
    console.log(this.file.size)
    if (this.file.size < 10000) {
      this.file = undefined
      this.msg = "size of file is less then 10kb"
      alert("Upload bigger size of file ")
    }
  }
 //when we click on upload button
  upload1() {
    document.getElementById('err').style.display="block";
    if (this.file == undefined) {
      this.msg = "Please select a file first"
    }
    debugger
    const storage = getStorage();
    const storageRef = ref(storage, '/Files' + this.file.name);
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
        this.msg = progress + '% done'
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
        this.msg = error
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);

          this.Ufile = downloadURL
          //-------------------------show in file in iframe -------------------------

          this.Find = this.Ufile
          console.log(this.Find)

          let doc: any = document.getElementById('frm')
          doc.src = this.Find
        });
      }
    );
  }

  
}
