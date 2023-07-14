import { Component } from '@angular/core';
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Component({
  selector: 'iandigo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  totalClients: number | undefined;

  constructor(private firestore: AngularFirestore) {
    this.getTotalClients();
  }

  getTotalClients() {
    this.firestore.collection('clients').get().subscribe((querySnapshot) => {
      this.totalClients = querySnapshot.size;
    });
  }
}
