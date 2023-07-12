import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from '../../services/user-service/user-service.service';

@Component({
    selector: 'iandigo-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent {
    name: string | undefined;
    email: string | undefined;
    uid: string | undefined;
    client: string | undefined;
    admin: string | undefined;

    constructor(private firestore: AngularFirestore, private userService: UserService) {}

    createUser() {
        if (!this.name || !this.email || !this.uid || !this.client || !this.admin) {
            console.error('Please enter all the required fields.');
            return;
        }

        const user = {
            name: this.name,
            email: this.email,
            uid: this.uid,
            client: this.client === 'true',
            admin: this.admin === 'true',
        };

        // Use the uid as the document name instead of add()
        this.firestore
            .collection('users')
            .doc(this.uid)
            .set(user)
            .then(() => {
                console.log('User created successfully!');
                // Reset form fields
                this.name = '';
                this.email = '';
                this.uid = '';
                this.client = '';
                this.admin = '';
                this.userService.addUser(user); // Add user to the UserService
            })
            .catch((error) => {
                console.error('Error creating user:', error);
            });
    }

    randomizeFields() {
        this.name = this.generateRandomName();
        this.email = this.generateRandomEmail();
        this.uid = this.generateRandomUID();
        this.client = this.generateRandomBoolean().toString();
        this.admin = this.generateRandomBoolean().toString();
    }

    private generateRandomName() {
        const names = ['John', 'Jane', 'David', 'Emily', 'Michael', 'Sophia'];
        return names[Math.floor(Math.random() * names.length)];
    }

    private generateRandomEmail() {
        const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'example.com'];
        const randomDomain = domains[Math.floor(Math.random() * domains.length)];
        const randomUsername = this.generateRandomName().toLowerCase();
        return `${randomUsername}@${randomDomain}`;
    }

    private generateRandomUID() {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let uid = '';
        for (let i = 0; i < 10; i++) {
            uid += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return uid;
    }

    private generateRandomBoolean() {
        return Math.random() < 0.5;
    }
}
