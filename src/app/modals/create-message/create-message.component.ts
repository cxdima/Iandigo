import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
    selector: 'iandigo-create-message',
    templateUrl: './create-message.component.html',
    styleUrls: ['./create-message.component.css'],
})
export class CreateMessageComponent {
    name: string | undefined;
    email: string | undefined;
    messageDate: string | undefined;
    subscriptionType: string | undefined;
    uid: string | undefined;
    messageContent: string | undefined;

    constructor(private firestore: AngularFirestore) {}

    createMessage() {
        if (!this.name || !this.email || !this.messageDate || !this.subscriptionType || !this.uid || !this.messageContent) {
            console.error('Please enter all the required fields.');
            return;
        }

        const message = {
            name: this.name,
            email: this.email,
            date: this.formatDate(this.messageDate),
            selectedPlan: this.subscriptionType,
            uid: this.uid,
            message: this.messageContent
        };

        this.firestore
            .collection('messages')
            .doc(this.uid)
            .set(message)
            .then(() => {
                console.log('Message created successfully!');
                // Reset form fields
                this.name = '';
                this.email = '';
                this.messageDate = '';
                this.subscriptionType = '';
                this.uid = '';
                this.messageContent = '';
            })
            .catch((error) => {
                console.error('Error creating message:', error);
            });
    }

    randomizeFields() {
        this.name = this.generateRandomName();
        this.email = this.generateRandomEmail();
        this.messageDate = this.generateRandomDate();
        this.subscriptionType = this.generateRandomSubscriptionType();
        this.uid = this.generateRandomUID();
        this.messageContent = this.generateRandomMessageContent();
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
        const [firstName, lastName] = (this.name || '').toLowerCase().split(' ');
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

    private generateRandomUID() {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let uid = '';
        for (let i = 0; i < 15; i++) {
            uid += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return uid;
    }

    private generateRandomMessageContent() {
        const messages = [
            'Hi, my name is [name] and I have a question about the [subscriptionType] plan.',
            'I\'m interested in learning more about the [subscriptionType] subscription.',
            'Could you provide more details about the [subscriptionType] plan?',
            'I\'m looking to upgrade my [subscriptionType] subscription. Can you assist me?',
            'Hello, I\'m [name]. I\'m considering the [subscriptionType] plan to boost my [socialMedia] page.',
            'Hi, my name is [name]. I\'m interested in the [subscriptionType] plan to enhance my [socialMedia] presence.',
            'Hello, [name] here! Can you provide more information about the [subscriptionType] subscription for [socialMedia]?',
            'Hey, I\'m [name]. I\'m considering the [subscriptionType] plan to grow my [socialMedia] account.',
            'Hi, I\'m [name] and I am considering the [subscriptionType] plan. Is it a good option for a [socialMedia] influencer?',
            'Greetings, my name is [name]. I\'m intrigued by the [subscriptionType] plan to promote my [socialMedia] channel.',
        ];

        const randomName = this.name || this.generateRandomName();
        const randomSubscription = this.subscriptionType || this.generateRandomSubscriptionType();
        const randomSocialMedia = ['Instagram', 'Facebook', 'Reddit', 'Twitter', 'OnlyFans'][Math.floor(Math.random() * 5)];

        const filteredMessages = messages.filter((message) => {
            const hasNamePlaceholder = message.includes('[name]');
            const hasSubscriptionPlaceholder = message.includes('[subscriptionType]');
            const hasSocialMediaPlaceholder = message.includes('[socialMedia]');
            return (
                (hasNamePlaceholder && this.name) ||
                (hasSubscriptionPlaceholder && this.subscriptionType) ||
                (hasSocialMediaPlaceholder && randomSocialMedia)
            );
        });

        const randomMessage = filteredMessages[Math.floor(Math.random() * filteredMessages.length)];

        return randomMessage
            .replace('[name]', randomName)
            .replace('[subscriptionType]', randomSubscription)
            .replace('[socialMedia]', randomSocialMedia);
    }
}
