import { Component, OnInit } from '@angular/core';
import { AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'iandigo-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private afAuth: AngularFireAuth) {}

  ngOnInit() {
    // Check if the user is already signed in
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, handle accordingly (e.g., redirect to dashboard)
        console.log('User is signed in:', user);
      } else {
        // User is signed out, handle accordingly
        console.log('User is signed out');
      }
    });
  }

  sendSignInLink(email: string) {
    const actionCodeSettings = {
      url: 'https://iandigo.web.app/home', // Replace with your app's URL
      handleCodeInApp: true,
    };

    this.afAuth
      .sendSignInLinkToEmail(email, actionCodeSettings)
      .then(() => {
        // Email sent. Inform the user to check their email for the sign-in link.
        console.log('Sign-in link sent to email:', email);
        // Save the email locally so you can auto-fill the email input
        window.localStorage.setItem('emailForSignIn', email);
      })
      .catch((error) => {
        // An error happened. Handle accordingly.
        console.error('Error sending sign-in link:', error);
      });
  }

  completeSignIn() {
    if (!this.afAuth.isSignInWithEmailLink(window.location.href)) {
      return;
    }
    let email = window.localStorage.getItem('emailForSignIn');
    if (!email) {
      // Prompt the user to enter their email manually
      email = window.prompt('Please provide your email for confirmation');
    }
    this.afAuth
      .signInWithEmailLink(email!, window.location.href)
      .then((result) => {
        // User successfully signed in
        console.log('User signed in successfully:', result);
        // Clear email from storage
        window.localStorage.removeItem('emailForSignIn');
        // Redirect or handle accordingly (e.g., navigate to dashboard)
      })
      .catch((error) => {
        // An error happened. Handle accordingly.
        console.error('Error signing in with email link:', error);
      });
  }
}
