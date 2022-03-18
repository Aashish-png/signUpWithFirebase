import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';

const routes:Routes=[
  {
    component:LandingComponent,
    pathMatch:'full',
    path:''
  },
  {
    component:LoginComponent,
    path: 'login'
  },
  {
    component:SignUpComponent,
    path: 'Sign-up'
  },
  {
    component:HomeComponent,
    path: 'home'
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
