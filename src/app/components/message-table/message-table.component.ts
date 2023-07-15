import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';

@Component({
    selector: 'iandigo-message-table',
    templateUrl: './message-table.component.html',
    styleUrls: ['./message-table.component.css'],
})
export class MessageTableComponent implements OnInit {
    messages: any[] = [];

    constructor(private firestore: AngularFirestore) {}

    ngOnInit() {
        this.fetchMessages();
    }

    fetchMessages() {
        this.firestore
            .collection('messages')
            .valueChanges()
            .subscribe((messages: any[]) => {
                this.messages = messages;
            });
    }

    deleteMessage(uid: string) {
        this.firestore
            .collection('messages')
            .doc(uid)
            .delete()
            .then(() => {
                console.log('Message successfully deleted!');
                this.fetchMessages();
            })
            .catch((error) => {
                console.error('Error removing message: ', error);
            });
    }
}