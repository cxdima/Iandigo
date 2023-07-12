import { Component, Input } from '@angular/core';

@Component({
  selector: 'iandigo-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  fullName!: string;
  email!: string;
  message!: string;

  @Input() selectedPlan!: string;
}
