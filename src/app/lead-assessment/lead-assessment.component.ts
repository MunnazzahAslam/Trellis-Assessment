import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

enum decision {
  WAIT_LIST = 'WAIT_LIST', 
  WAIT_LIST_FUTURE_CITY = 'WAIT_LIST_FUTURE_CITY', 
  WAIT_LIST_MORE_PROPERTY_DOCS = 'WAIT_LIST_MORE_PROPERTY_DOCS', 
  INELIGIBLE_TEMPORARY = 'INELIGIBLE_TEMPORARY', 
  INELIGIBLE_PERMANENT = 'INELIGIBLE_PERMANENT',

}
@Component({
  selector: 'app-lead-assessment',
  templateUrl: './lead-assessment.component.html',
  styleUrls: ['./lead-assessment.component.scss']
})
export class LeadAssessmentComponent {
  city: string = '';
  monthlyIncome: number = 0;
  downPaymentAmount: number = 0;
  requestedLoanAmount: number = 0;
  historyOfBankruptcy: boolean = false;
  allDocumentsAvailable: boolean = true;
  decision: string = '';
  decisionDetails = '';
  leadAssessmentForm: FormGroup = this.createForm();

  constructor(private fb: FormBuilder) {}

  createForm() {
    return this.fb.group({
      city: ['', Validators.required],
      monthlyIncome: ['', [Validators.required, Validators.min(30000), Validators.max(150000)]],
      downPaymentAmount: ['', [Validators.required]],
      requestedLoanAmount: ['', [Validators.required, Validators.min(100000), Validators.max(3000000)]],
      historyOfBankruptcy: [''],
      allDocumentsAvailable: ['']
    });
  }

  makeDecision(): string {
    const monthlyIncomeValue = this.leadAssessmentForm.get('monthlyIncome')?.value;
    const requestedLoanAmountValue = this.leadAssessmentForm.get('requestedLoanAmount')?.value;
    const downPaymentAmountValue = this.leadAssessmentForm.get('downPaymentAmount')?.value;
    const allDocumentsAvailableValue = this.leadAssessmentForm.get('allDocumentsAvailable')?.value;
  
    if (this.historyOfBankruptcy) {
      this.decisionDetails = ''
      return decision.INELIGIBLE_PERMANENT;
    }
  
    if (!monthlyIncomeValue || monthlyIncomeValue < 30000 || monthlyIncomeValue > 150000) {
      this.decisionDetails = 'You are temporarily ineligible for a loan because of your monthly income. Please contact us to discuss options.';
      return decision.INELIGIBLE_TEMPORARY;
    }
  
    if (!requestedLoanAmountValue || requestedLoanAmountValue < 100000 || requestedLoanAmountValue > 3000000) {
      this.decisionDetails = 'You are temporarily ineligible for a loan because of your requested loan amount. Please contact us to discuss options.';
      return decision.INELIGIBLE_TEMPORARY;
    }
  
    if (requestedLoanAmountValue > 4.5 * monthlyIncomeValue * 12) {
      this.decisionDetails = 'You are temporarily ineligible for a loan because of your requested loan amount. Please contact us to discuss options.';
      return decision.INELIGIBLE_TEMPORARY;
    }
  
    if (!downPaymentAmountValue || downPaymentAmountValue < requestedLoanAmountValue * 0.2 ||
        downPaymentAmountValue > requestedLoanAmountValue * 0.8) {
      this.decisionDetails = 'You are temporarily ineligible for a loan because of your down payment amount. Please contact us to discuss options.';
      return decision.INELIGIBLE_TEMPORARY;
    }
  
    if (!allDocumentsAvailableValue) {
      this.decisionDetails = 'You are temporarily ineligible for a loan because of your property documents. Please contact us to discuss options.';
      return decision.WAIT_LIST_MORE_PROPERTY_DOCS;
    }
  
    if (this.city !== 'Karachi') {
      this.decisionDetails = 'You are on the waitlist as we donot operate in your city yet. We qill keep you updated.';
      return decision.WAIT_LIST_FUTURE_CITY;
    }
  
    this.decisionDetails = 'You are eligible for the loan. We will be contacting you to schedule an appointment.';
    return decision.WAIT_LIST;
  }  

  onSubmit() {
      this.decision = this.makeDecision();
  }
}
