import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Component({
  selector: 'iandigo-home-navigation',
  templateUrl: './home-navigation.component.html',
  styleUrls: ['./home-navigation.component.css'],
})
export class HomeNavigationComponent implements OnInit {
  isLoggedIn = false;
  contentLoaded = false;

  constructor(private afAuth: AngularFireAuth) {}

  ngOnInit(): void {
    this.afAuth.authState.subscribe((user) => {
      this.isLoggedIn = !!user;
      this.contentLoaded = true;
    });
  }

  signOut() {
    this.afAuth.signOut()
        .then(() => {
          console.log('User signed out successfully.');
          location.reload();
        })
        .catch((error) => {
          console.error('Error signing out:', error);
        });
  }
}

