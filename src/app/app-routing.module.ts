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
import { ShowdataComponent } from './components/showdata/showdata.component';
import { UpdateComponent } from './components/update/update.component';
import { ExportComponent } from './components/export/export.component';


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
  },
  {component:ShowdataComponent,
    path:"show"
   },
   {
    component:UpdateComponent,
    path:"update/:id"
  },
  {component:ExportComponent,
    path:"export"
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
