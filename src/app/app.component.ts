import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  public isAuthenticated = false;
  public opened = false;
  public pages = [
    { title: 'Home', url: '/pages/home', icon: 'home' },
    { title: 'Favorites', url: '/pages/favorites', icon: 'favorite' },
    { title: 'Messages', url: '/pages/messages', icon: 'mail' },
    { title: 'Help', url: '/pages/help', icon: 'help' },
  ];

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.eventSession.subscribe(value => {
      this.isAuthenticated = value;
    });

    if(this.isAuthenticated) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/pages/login']);
    }
  }

  ngOnDestroy(): void {
    this.auth.eventSession.unsubscribe();
  }

  logout() {
    this.opened = false;
    this.auth.logout();
    this.router.navigate(['/pages/login']);
  }
}
