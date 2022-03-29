import { Injectable, OnInit } from '@angular/core';
import { Firestore, getDoc, getDocs } from '@angular/fire/firestore';
import { collection, addDoc, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';

import {
  getDownloadURL,
  getStorage,
  ref,
  Storage,
  uploadBytes,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { finalize, from, map, Observable, switchMap } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class CrudService implements OnInit {
  public data: any = []

  arry: any = [];

  //empty: any = []



  constructor(public fireservice: Firestore, public storage: Storage) { }

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

  getData() {
    debugger
    let nw: any = []
    return new Promise(async (resolve, rejects) => {
      const querySnapshot = await getDocs(collection(this.fireservice, "students"))

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



  ////for image upload 


  upload() {

  }


}
