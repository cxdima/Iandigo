import { Component } from '@angular/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'iandigo-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  isLoggedIn = false;

  constructor() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.isLoggedIn = !!user;
    });
  }
}
