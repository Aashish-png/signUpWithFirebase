import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);


const routes: Routes = [
  {
    component: LandingComponent,
    pathMatch: 'full',
    path: ''
  },
  {
    component: LoginComponent,
    path: 'login',
    ...canActivate(redirectLoggedInToHome)

  },
  {
    component: SignUpComponent,
    path: 'Sign-up',
    ...canActivate(redirectLoggedInToHome)
  },
  {
    component: HomeComponent,
    path: 'home',
    ...canActivate(redirectUnauthorizedToLogin)
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
