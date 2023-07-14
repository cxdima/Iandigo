import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from '../../services/user-service/user-service.service';

@Component({
    selector: 'iandigo-client-table',
    templateUrl: './client-table.component.html',
    styleUrls: ['./client-table.component.css'],
})
export class ClientTableComponent implements OnInit {
    clients: any[] = [];

    constructor(private firestore: AngularFirestore, private userService: UserService) {}

    ngOnInit() {
        this.fetchClients();
    }

    fetchClients() {
        this.firestore
            .collection('clients')
            .valueChanges()
            .subscribe((clients: any[]) => {
                this.clients = clients;
            });
    }

    deleteClient(uid: string) {
        this.firestore
            .collection('clients')
            .doc(uid)
            .delete()
            .then(() => {
                console.log('Document successfully deleted!');
                this.fetchClients();
            })
            .catch((error) => {
                console.error('Error removing document: ', error);
            });
    }
}
