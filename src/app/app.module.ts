import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from "@angular/fire/compat";
import { FormsModule } from '@angular/forms';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';



import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { initializeApp } from "firebase/app";
import { HotToastModule } from '@ngneat/hot-toast';
import { provideFirebaseApp } from '@angular/fire/app';
import { getAuth } from 'firebase/auth';
import { provideAuth } from '@angular/fire/auth';
import { MatMenuModule } from '@angular/material/menu';
import { ShowdataComponent } from './components/showdata/showdata.component';
import { CrudService } from './services/crud.service';
import { UpdateComponent } from './components/update/update.component';
// import { MessagingService } from './services/messaging.service';
import { getMessaging } from 'firebase/messaging';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ExportComponent } from './components/export/export.component';
//import { ServiceWorkerModule } from '@angular/service-worker';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    ShowdataComponent,
    UpdateComponent,
    ExportComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    AngularFireModule,
    AngularFireMessagingModule,
    MatButtonToggleModule,
    
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  
   
  ],
  providers: [CrudService],
  bootstrap: [AppComponent]
})
export class AppModule { }

