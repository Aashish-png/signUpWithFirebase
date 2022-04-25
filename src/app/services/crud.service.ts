import { Injectable, OnInit } from '@angular/core';
import { endAt, Firestore, getDoc, getDocs } from '@angular/fire/firestore';
import { collection, addDoc, doc, deleteDoc, updateDoc, startAfter } from '@angular/fire/firestore';
import { query, orderBy, limit, startAt, setDoc } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  Storage,
  uploadBytes,
  uploadBytesResumable,
} from '@angular/fire/storage';




@Injectable({
  providedIn: 'root'
})
export class CrudService implements OnInit {
  public data: any = []

  arry: any = [];
  lastRes: any = [];

  //empty: any = []



  constructor(public fireservice: Firestore, public storage: Storage,) { }

  ngOnInit(): void {

  }
  //add data to database 
  create_newStudent(record) {
    return new Promise((resolve, reject) => {
      addDoc(collection(this.fireservice, "students"), record).then((result) => {

        resolve(result)

      }).catch((err) => {

        console.log(err)
        reject(err)
      })
      console.log('call')
    })
  }


  //Read data from database

  getData(i: any) {
    debugger

    let nw: any = []

    return new Promise(async (resolve, rejects) => {
      const ref = collection(this.fireservice, "students")
      if (i == 1) {
        var db = query(ref, orderBy("timeS"), limit(5));
      }
      else {
        var db = query(ref, orderBy("timeS"), startAfter(i), limit(5),);
      }
      if (i == 0) {
        var db = query(ref, orderBy("timeS"), startAt(i), limit(5),);
      }

      const querySnapshot = await getDocs(db)


      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let data = doc.data()
        data['id'] = doc.id
        nw.push(data)

        debugger
        console.log(doc.id, " ==> ", doc.data());

      })


      console.log(nw)
      resolve(nw)



    })

  }

  // //delete data 

  async deleteData(id: string) {

    await deleteDoc(doc(this.fireservice, "students", id))

      .then(() => {
        alert('Data Deleted');

      })
      .catch((err) => {
        alert(err.message)
      })

  }
  ////edit the data when clicked  using ngoninit  *************
  edit(id: string) {
    return new Promise(async (resolve, rejects) => {

      const querySnapshot = await getDocs(collection(this.fireservice, "students"))

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let data = doc.data()
        data['id'] = doc.id
        this.arry.push(data)

        debugger


      })


      const curData = this.arry.find((m: any) => m.id == id)

      resolve(curData)


    })




  }
  //to update the records 
  Update(record: any) {
    return new Promise(async (resolve, rejects) => {
      const dataToUpdate = doc(this.fireservice, 'students', record.id)

      await updateDoc(dataToUpdate, record)
        .then((result) => {
          console.log(result)
          resolve(result)

        }).catch((err) => {
          rejects(err)
          console.log(err)
        })
    })


  }






  prev(timeS: number) {

    let nw: any = []

    return new Promise(async (resolve, rejects) => {
      const ref = collection(this.fireservice, "students")

      const db = query(ref, orderBy("timeS", 'desc'), endAt(timeS), limit(5),);
      const querySnapshot = await getDocs(db)

      debugger
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let data = doc.data()
        data['id'] = doc.id
        nw.push(data)

        debugger
        console.log(doc.id, " ==> ", doc.data());

      })


      console.log(nw)
      resolve(nw)



    })

  }


  ///--------------------------------------



  async addData(data: any) {
    debugger
    return new Promise(async (resolve, rejects) => {


      const newCityRef = doc(collection(this.fireservice, "contentAccountMapping", "quiz", "question"));

      await setDoc(newCityRef, data);

      resolve(setDoc)

    })
  }

  ///user notifications for block

  async userData(){
    await setDoc(doc(this.fireservice, "user/cpmP2gQm1GRtwudvHTFT/userSetting/cpmP2gQm1GRtwudvHTFT"), {
      notification: "false",
        });
  }

  //user notifications for allow
  async userData1(){
    await setDoc(doc(this.fireservice, "user/cpmP2gQm1GRtwudvHTFT/userSetting/cpmP2gQm1GRtwudvHTFT"), {
      notification: "true",
        });
  }
  



  //------service worker notificatios



  // addSubscription(sub: PushSubscription) {
  //   return lastValueFrom(
  //     this.http.post('http://localhost:4200/api/subscription', { sub })
  //   );
  // }
  

  // notifications(data: string) {
  //   return lastValueFrom(
  //     this.http.post('http://localhost:3000/api/notifications', { data })
  //   );
  // }

}



