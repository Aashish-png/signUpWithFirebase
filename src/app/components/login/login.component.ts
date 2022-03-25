import { Component, OnInit } from '@angular/core';
import { Auth, FacebookAuthProvider } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
 
import { AuthenticationService } from 'src/app/services/authentication.service';
import{ GoogleAuthProvider, }from '@angular/fire/auth'


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

    //submit fucntion
     submit(){
       if(!this.loginForm.valid){
         return;
       }
     
     const {email,password}= this.loginForm.value;
     this.authService.login(email,password).pipe(
       this.toast.observe({
         success:'Logged in successfully',
         loading:'logging in ...',
         error:({ message }) => `There was an error: ${message} `
       })
     ).subscribe(()=>{          
       this.router.navigate(['/home']);
     });
    }


    //sign in with google 
    SignInGoogle() {
      
      this.authService.googleSignIn(new GoogleAuthProvider).pipe(
        this.toast.observe({
          success:'Logged in successfully',
          loading:'logging in ...',
          error:({ message }) => `There was an error: ${message} `
        })
      ).subscribe(()=>{
        this.router.navigate(['/home']);
      });
    }
    //sign in with facebook 
    SignInFB(){
      
      this.authService.facbookSingIN(new FacebookAuthProvider).pipe(
        this.toast.observe({
          success:'Logged in successfully',
          loading:'logging in ...',
          error:({ message }) => `There was an error: ${message} `
        })
      ).subscribe(()=>{
        this.router.navigate(['/home']);
      });
    }
    
          
    
    
}