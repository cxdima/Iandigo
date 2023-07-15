import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
    selector: 'iandigo-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent {
    name: string | undefined;
    email: string | undefined;
    subscriptionDate: string | undefined;
    subscriptionType: string | undefined;
    totalPaid: number | undefined;
    uid: string | undefined;

    constructor(private firestore: AngularFirestore) {}

    createUser() {
        if (!this.name || !this.email || !this.subscriptionDate || !this.subscriptionType || !this.totalPaid || !this.uid) {
            console.error('Please enter all the required fields.');
            return;
        }

        const user = {
            name: this.name,
            email: this.email,
            subscriptionDate: this.formatDate(this.subscriptionDate), // Format the date
            subscriptionType: this.capitalizeFirstLetter(this.subscriptionType),
            totalPaid: this.totalPaid,
            uid: this.uid
        };

        // Use the uid as the document name instead of add()
        this.firestore
            .collection('clients')
            .doc(this.uid)
            .set(user)
            .then(() => {
                console.log('User created successfully!');
                // Reset form fields
                this.name = '';
                this.email = '';
                this.subscriptionDate = '';
                this.subscriptionType = '';
                this.totalPaid = undefined;
                this.uid = '';
            })
            .catch((error) => {
                console.error('Error creating user:', error);
            });
    }

    randomizeFields() {
        this.name = this.generateRandomName();
        this.email = this.generateRandomEmail();
        this.subscriptionDate = this.generateRandomDate();
        this.subscriptionType = this.generateRandomSubscriptionType();
        this.totalPaid = this.generateRandomTotalPaid();
        this.uid = this.generateRandomUID();
    }

    private capitalizeFirstLetter(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    private generateRandomName() {
        const names = ['John', 'Jane', 'David', 'Emily', 'Michael', 'Sophia', 'Oliver', 'Emma', 'William', 'Ava'];
        const lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Taylor', 'Clark'];
        const randomFirstName = names[Math.floor(Math.random() * names.length)];
        const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        return `${randomFirstName} ${randomLastName}`;
    }

    private generateRandomEmail() {
        const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'example.com'];
        const randomDomain = domains[Math.floor(Math.random() * domains.length)];
        const [firstName, lastName] = this.name!.toLowerCase().split(' ');
        return `${firstName}${lastName}@${randomDomain}`;
    }

    private formatDate(dateString: string): string {
        const date = new Date(dateString);
        const timeZoneOffset = date.getTimezoneOffset() * 60 * 1000; // Time zone offset in milliseconds
        const adjustedDate = new Date(date.getTime() + timeZoneOffset);
        const month = adjustedDate.toLocaleString('default', { month: 'short' });
        const day = adjustedDate.getDate();
        const year = adjustedDate.getFullYear();
        return `${month} ${day}, ${year}`;
    }

    private generateRandomDate() {
        const date = new Date();
        date.setDate(date.getDate() - Math.floor(Math.random() * 365)); // Random date in the past year
        return date.toISOString().substring(0, 10); // Format as YYYY-MM-DD
    }

    private generateRandomSubscriptionType() {
        const types = ['Personal', 'Premium', 'Business', 'Corporate'];
        return types[Math.floor(Math.random() * types.length)];
    }

    private generateRandomTotalPaid() {
        return Math.floor(Math.random() * 2801) + 200; // Random value between 200 and 3000
    }

    private generateRandomUID() {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let uid = '';
        for (let i = 0; i < 15; i++) {
            uid += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return uid;
    }
}