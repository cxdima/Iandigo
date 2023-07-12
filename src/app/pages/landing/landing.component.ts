import { Component, Output, EventEmitter } from '@angular/core';
import { getAuth, onAuthStateChanged, User } from "@angular/fire/auth";

@Component({
  selector: 'iandigo-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent {
  selectedPlan!: string;
  name: any | undefined;
  isLoggedIn: boolean | undefined;

  @Output() selectedPlanChange = new EventEmitter<string>();

  ngOnInit() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        this.name = user.email;
        this.isLoggedIn = true;
      } else {
        this.name = undefined;
        this.isLoggedIn = false;
      }
    });
  }

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
