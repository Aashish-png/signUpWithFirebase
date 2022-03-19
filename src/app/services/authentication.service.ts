import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth'
import { AuthProvider, createUserWithEmailAndPassword,  GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { authState } from 'rxfire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from } from 'rxjs';


import 'firebase/auth';



import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  


  currentUser$ = authState(this.auth)
 
  constructor(private auth: Auth,
   
     

  ) { }

  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }

  signUp(name: string, email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password))

  }


  logout() {
    return from(this.auth.signOut());
  }

  //sign in with google 
  googleSignIn(GoogleAuthProvider: GoogleAuthProvider ) {
   return from( signInWithPopup( this.auth , GoogleAuthProvider))  
  }
}



