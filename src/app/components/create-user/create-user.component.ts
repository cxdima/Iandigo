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

    constructor(private firestore: AngularFirestore, private userService: UserService) {}

    createUser() {
        if (!this.name || !this.email || !this.uid) {
            console.error('Please enter all the required fields.');
            return;
        }

        const user = {
            name: this.name,
            email: this.email,
            uid: this.uid
        };

        // Use the uid as the document name instead of add()
        this.firestore.collection('users').doc(this.uid).set(user)
            .then(() => {
                console.log('User created successfully!');
                // Reset form fields
                this.name = '';
                this.email = '';
                this.uid = '';
                this.userService.addUser(user); // Add user to the UserService
            })
            .catch((error) => {
                console.error('Error creating user:', error);
            });
    }
}
