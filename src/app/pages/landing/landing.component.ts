import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'iandigo-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent {
  fullName!: string;
  email!: string;
  message!: string;
  selectedPlan!: string;

  @Output() selectedPlanChange = new EventEmitter<string>();

  preselectPersonalPlan() {
    this.selectedPlan = 'Personal';
    this.selectedPlanChange.emit(this.selectedPlan);
  }

  preselectPremiumPlan() {
    this.selectedPlan = 'Premium';
    this.selectedPlanChange.emit(this.selectedPlan);
  }

  preselectBusinessPlan() {
    this.selectedPlan = 'Business';
    this.selectedPlanChange.emit(this.selectedPlan);
  }

  preselectCorporatePlan() {
    this.selectedPlan = 'Corporate';
    this.selectedPlanChange.emit(this.selectedPlan);
  }
}
