import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LeadAssessmentComponent } from './lead-assessment.component';

describe('LeadAssessmentComponent', () => {
  let component: LeadAssessmentComponent;
  let fixture: ComponentFixture<LeadAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeadAssessmentComponent],
      imports: [ReactiveFormsModule, FormsModule, CommonModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the leadAssessmentForm', () => {
    expect(component.leadAssessmentForm).toBeTruthy();
  });

  it('should mark form controls as invalid when empty', () => {
    const form = component.leadAssessmentForm;
    expect(form.valid).toBeFalsy();

    const cityControl = form.controls['city'];
    cityControl.setValue('');
    expect(cityControl.valid).toBeFalsy();
  });

  it('should make decision properly based on form inputs', () => {
    component.city = 'Karachi';
    component.leadAssessmentForm.patchValue({
      monthlyIncome: 60000,
      downPaymentAmount: 50000,
      requestedLoanAmount: 200000,
      historyOfBankruptcy: false,
      allDocumentsAvailable: true
    });

    expect(component.makeDecision()).toEqual('WAIT_LIST');
  });
});
