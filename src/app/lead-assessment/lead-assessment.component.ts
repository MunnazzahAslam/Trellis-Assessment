import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-lead-assessment',
  templateUrl: './lead-assessment.component.html',
  styleUrls: ['./lead-assessment.component.scss'],
})
export class LeadAssessmentComponent {
  userData: FormGroup = this.createUserDataForm();
  decision: string = '';

  private INCOME_MIN = 30000;
  private INCOME_MAX = 150000;
  private LOAN_RATIO = 4.5;
  private DOWNPAYMENT_MIN_RATIO = 0.2;
  private DOWNPAYMENT_MAX_RATIO = 0.8;
  private OPERATIONAL_CITY = 'Karachi';

  constructor(private fb: FormBuilder) {
    console.log(this.userData);
    
  }

  createUserDataForm() {
    return this.userData = this.fb.group({
      city: ['', Validators.required],
      monthlyIncome: ['', [Validators.required, Validators.min(this.INCOME_MIN), Validators.max(this.INCOME_MAX)]],
      downPayment: ['', Validators.required],
      loanAmount: ['', Validators.required],
      bankrupt: [false],
      hasAllDocuments: [true]
    });
  }

  makeDecision() {
    if (!this.userData.valid) {
      return;
    }

    const city = this.userData.value.city;
    const monthlyIncome = this.userData.value.monthlyIncome;
    const downPayment = this.userData.value.downPayment;
    const loanAmount = this.userData.value.loanAmount;
    const isBankrupt = this.userData.value.bankrupt;
    const hasAllDocuments = this.userData.value.hasAllDocuments;

    if (isBankrupt) {
      this.decision = 'INELIGIBLE_PERMANENT';
    } else if (!this.isIncomeEligible(monthlyIncome)) {
      this.decision = 'INELIGIBLE_TEMPORARY';
    } else if (!this.isLoanAmountEligible(loanAmount, monthlyIncome)) {
      this.decision = 'INELIGIBLE_TEMPORARY';
    } else if (!this.isDownPaymentEligible(downPayment, loanAmount)) {
      this.decision = 'INELIGIBLE_TEMPORARY';
    } else if (!hasAllDocuments) {
      this.decision = 'WAIT_LIST_MORE_PROPERTY_DOCS';
    } else if (!this.isCityEligible(city)) {
      this.decision = 'WAIT_LIST_FUTURE_CITY';
    } else {
      this.decision = 'WAIT_LIST';
    }

    console.log(this.decision);
    
  }

  private isIncomeEligible(income: number): boolean {
    return income >= this.INCOME_MIN && income <= this.INCOME_MAX;
  }

  private isLoanAmountEligible(loanAmount: number, income: number): boolean {
    return loanAmount <= income * this.LOAN_RATIO;
  }

  private isDownPaymentEligible(downPayment: number, loanAmount: number): boolean {
    const minDownPayment = loanAmount * this.DOWNPAYMENT_MIN_RATIO;
    const maxDownPayment = loanAmount * this.DOWNPAYMENT_MAX_RATIO;
    return downPayment >= minDownPayment && downPayment <= maxDownPayment;
  }
  
  private isCityEligible(city: string): boolean {
    return city === this.OPERATIONAL_CITY;
  }
}
