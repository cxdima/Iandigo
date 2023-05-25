import { Component } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Component({
  selector: 'iandigo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private afAuth: AngularFireAuth) {}

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Login successful
        const user = userCredential.user;
        console.log('User logged in:', user);
        // Additional actions after successful login
      })
      .catch((error) => {
        // Login failed
        console.error('Error logging in:', error);
        // Handle error and display appropriate message to the user
      });
  }
}
