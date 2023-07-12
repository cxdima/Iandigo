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
    sortedColumn: string | null = null;
    sortDirection: 'asc' | 'desc' = 'asc';

    constructor(private firestore: AngularFirestore, private userService: UserService) {}

    ngOnInit() {
        this.userService.getUsers().subscribe((users: any[]) => {
            this.clients = users;
            this.sortClients('name'); // Sort clients initially by name (can be changed)
        });

        this.fetchClients(); // Initial fetch
    }

    fetchClients() {
        this.firestore
            .collection('users')
            .valueChanges()
            .subscribe((users: any[]) => {
                this.clients = users;
                this.sortClients('name'); // Sort clients initially by name (can be changed)
            });
    }

    deleteClient(uid: string) {
        this.firestore
            .collection('users')
            .doc(uid)
            .delete()
            .then(() => {
                console.log('Document successfully deleted!');
                // Optional: Update the client list after deletion
                this.fetchClients();
            })
            .catch((error) => {
                console.error('Error removing document: ', error);
            });
    }


    sortClients(column: string) {
        if (this.sortedColumn === column) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.sortedColumn = column;
            this.sortDirection = 'asc';
        }

        this.clients.sort((a, b) => {
            const valueA = a[column].toLowerCase();
            const valueB = b[column].toLowerCase();

            if (valueA < valueB) {
                return this.sortDirection === 'asc' ? -1 : 1;
            } else if (valueA > valueB) {
                return this.sortDirection === 'asc' ? 1 : -1;
            } else {
                return 0;
            }
        });
    }
}
