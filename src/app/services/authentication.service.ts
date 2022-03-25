import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth'
import { AuthProvider, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { authState } from 'rxfire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, switchMap } from 'rxjs';

import { getAuth, FacebookAuthProvider } from "firebase/auth";
import 'firebase/auth';




@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {



  currentUser$ = authState(this.auth)

  constructor(private auth: Auth
  ) { }
  //login using emaill and password 
  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, username, password));
  }
  //sign up using email and password 
  signUp(name: string, email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(({ user}) =>
      updateProfile(user,{  displayName: name })
    ))
    
  }

  //log out function
  logout() {
    return from(this.auth.signOut());
  }

  //sign in with google 
  googleSignIn(GoogleAuthProvider: GoogleAuthProvider) {
    return from(signInWithPopup(this.auth, GoogleAuthProvider))
  }


  //sign in with facebook 
  facbookSingIN (FacebookAuthProvider:FacebookAuthProvider){
    return from(signInWithPopup(this.auth,FacebookAuthProvider))
  }
  
  
 

}
