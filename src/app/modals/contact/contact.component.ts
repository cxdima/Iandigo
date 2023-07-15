import {Component, Input} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
    selector: 'iandigo-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
    name!: string;
    email!: string;
    message!: string;

    @Input() selectedPlan!: string;

    constructor(private firestore: AngularFirestore) {
    }

    submitForm() {
        const currentDate = new Date();
        const formattedDate = this.formatDate(currentDate.toISOString());

        const uid = this.generateUID();

        const data = {
            date: formattedDate,
            uid: uid,
            name: this.name,
            email: this.email,
            message: this.message,
            selectedPlan: this.selectedPlan,
        };

        this.firestore
            .collection('messages')
            .doc(uid)
            .set(data)
            .then(() => {
                console.log('Message sent successfully!');
                this.resetForm(); // Reset the form fields after successful submission
            })
            .catch((error) => {
                console.log(error);
            });
    }

    private formatDate(dateString: string): string {
        const date = new Date(dateString);
        const timeZoneOffset = date.getTimezoneOffset() * 60 * 1000; // Time zone offset in milliseconds
        const adjustedDate = new Date(date.getTime() + timeZoneOffset);
        const month = adjustedDate.toLocaleString('default', {month: 'short'});
        const day = adjustedDate.getDate();
        const year = adjustedDate.getFullYear();
        return `${month} ${day}, ${year}`;
    }

    private generateUID(): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let uid = '';

        for (let i = 0; i < 15; i++) {
            uid += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return uid;
    }

    private resetForm(): void {
        this.name = '';
        this.email = '';
        this.message = '';
        this.selectedPlan = '';
    }
}