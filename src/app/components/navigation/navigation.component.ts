import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'iandigo-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
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
          // Sign-out successful.
          console.log('User signed out successfully.');
          // Perform any additional actions after signing out (e.g., redirecting).
        })
        .catch((error) => {
          // An error happened.
          console.error('Error signing out:', error);
        });
  }
}
