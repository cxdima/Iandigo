import { Component } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Component({
  selector: 'iandigo-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  constructor(private afAuth: AngularFireAuth) {}
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
