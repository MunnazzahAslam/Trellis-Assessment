import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LeadAssessmentComponent } from './lead-assessment/lead-assessment.component';

@NgModule({
  declarations: [
    AppComponent,
    LeadAssessmentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [AppComponent, LeadAssessmentComponent],
})
export class AppModule { }
