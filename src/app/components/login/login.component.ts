import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
 
import { AuthenticationService } from 'src/app/services/authentication.service';
import{ GoogleAuthProvider, signInWithPopup}from '@angular/fire/auth'
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup(
    { 
      email:new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',Validators.required),
    }
  );

  constructor( private authService:AuthenticationService,
    private auth:Auth,
     private router:Router,
    private toast:HotToastService
    
    ) { }

  ngOnInit(): void {
    }
    get email(){
      return this.loginForm.get('email');
    }
    get password(){
      return this.loginForm.get('password');
    }
     submit(){
       if(!this.loginForm.valid){
         return;
       }
     
     const {email,password}= this.loginForm.value;
     this.authService.login(email,password).pipe(
       this.toast.observe({
         success:'Logged in successfully',
         loading:'logging in ...',
         error:'there was an error'
       })
     ).subscribe(()=>{
       this.router.navigate(['/home']);
     });
    }

    SignInGoogle() {
      this.authService.googleSignIn(new GoogleAuthProvider).subscribe(()=>{
        this.router.navigate(['/home']);
      });
    }
    

}