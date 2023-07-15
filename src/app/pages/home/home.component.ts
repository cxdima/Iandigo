import { Component } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Component({
  selector: 'iandigo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  totalClients: number | undefined;
  totalMessages: number| undefined;

  constructor(private firestore: AngularFirestore) {
    this.getTotalClients();
    this.getTotalMessages();
  }

  getTotalClients() {
    this.firestore.collection('clients').get().subscribe((querySnapshot) => {
      this.totalClients = querySnapshot.size;
    });
  }

  getTotalMessages() {
    this.firestore.collection('messages').get().subscribe((querySnapshot) => {
      this.totalMessages = querySnapshot.size;
    });
  }
}
