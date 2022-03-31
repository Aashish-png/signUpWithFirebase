import { Component } from '@angular/core';
import {
  Router, NavigationStart, NavigationEnd,
  NavigationCancel, NavigationError, Event
} from '@angular/router';

import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showLoadingIndicator: boolean;

  constructor(public authService: AuthenticationService, private router: Router) { 

  

  this.router.events.subscribe((routerEvent: Event) => {

    
    if (routerEvent instanceof NavigationStart) {
      this.showLoadingIndicator = true;
    }

    
    
    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationError ||
      routerEvent instanceof NavigationCancel) {
      this.showLoadingIndicator = false;
    }

  });

  
}

logout() {
  this.authService.logout().subscribe(() => {
      this.router.navigate(['']);
  })
}

  
}

