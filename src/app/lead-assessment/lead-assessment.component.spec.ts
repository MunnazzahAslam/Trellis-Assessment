import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeadAssessmentComponent } from './lead-assessment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const mockValidData = {
  city: 'Karachi',
  monthlyIncome: 60000,
  downPayment: 30000,
  loanAmount: 150000,
  bankrupt: false,
  hasAllDocuments: true
};

const mockBankruptData = { ...mockValidData, bankrupt: true };
const mockLowIncomeData = { ...mockValidData, monthlyIncome: 25000 };
const mockHighIncomeData = { ...mockValidData, monthlyIncome: 155000 };
const mockHighLoanData = { ...mockValidData, loanAmount: 250000 };
const mockLowDownPaymentData = { ...mockValidData, downPayment: 15000 };
const mockHighDownPaymentData = { ...mockValidData, downPayment: 130000 };
const mockMissingDocumentsData = { ...mockValidData, hasAllDocuments: false };
const mockNonOperationalCityData = { ...mockValidData, city: 'Islamabad' };

describe('LeadAssessmentComponent', () => {
  let component: LeadAssessmentComponent;
  let fixture: ComponentFixture<LeadAssessmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeadAssessmentComponent],
      imports: [ReactiveFormsModule, CommonModule],
    });
    fixture = TestBed.createComponent(LeadAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should return INELIGIBLE_PERMANENT for bankrupt user', () => {
    component.userData.setValue(mockBankruptData);
    component.makeDecision();
    expect(component.decision).toEqual('INELIGIBLE_PERMANENT');
  });

  it('should return INELIGIBLE_TEMPORARY for income below minimum', () => {
    component.userData.setValue(mockLowIncomeData);
    component.makeDecision();
    expect(component.decision).toEqual('INELIGIBLE_TEMPORARY');
  });

  it('should return INELIGIBLE_TEMPORARY for income above maximum', () => {
    component.userData.setValue(mockHighIncomeData);
    component.makeDecision();
    expect(component.decision).toEqual('INELIGIBLE_TEMPORARY');
  });

  it('should return INELIGIBLE_TEMPORARY for loan exceeding income ratio', () => {
    component.userData.setValue(mockHighLoanData);
    component.makeDecision();
    expect(component.decision).toEqual('INELIGIBLE_TEMPORARY');
  });

  it('should return INELIGIBLE_TEMPORARY for down payment below minimum', () => {
    component.userData.setValue(mockLowDownPaymentData);
    component.makeDecision();
    expect(component.decision).toEqual('INELIGIBLE_TEMPORARY');
  });

  it('should return INELIGIBLE_TEMPORARY for down payment above maximum', () => {
    component.userData.setValue(mockHighDownPaymentData);
    component.makeDecision();
    expect(component.decision).toEqual('INELIGIBLE_TEMPORARY');
  });

  it('should return WAIT_LIST_MORE_PROPERTY_DOCS for missing documents', () => {
    component.userData.setValue(mockMissingDocumentsData);
    component.makeDecision();
    expect(component.decision).toEqual('WAIT_LIST_MORE_PROPERTY_DOCS');
  });

  it('should return WAIT_LIST_FUTURE_CITY for non-operational city', () => {
    component.userData.setValue(mockNonOperationalCityData);
    component.makeDecision();
    expect(component.decision).toEqual('WAIT_LIST_FUTURE_CITY');
  });

  it('should return WAIT_LIST for eligible criteria', () => {
    component.userData.setValue(mockValidData);
    component.makeDecision();
    expect(component.decision).toEqual('WAIT_LIST');
  });
});
