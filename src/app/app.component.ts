import { Component } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";


@Component({
  selector: 'iandigo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  isLandingPage: boolean |undefined;
  isHomePage: boolean | undefined;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLandingPage = (event.url === '/' || event.url === '/#service'|| event.url === '/#pricing' || event.url === '/#faq');
        this.isHomePage = (event.url === '/home');
      }
    });
  }
}