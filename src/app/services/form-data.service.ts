import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormField } from '../dynamic-template.service';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
 private formFieldsSubject = new BehaviorSubject<FormField[]>([
  { name: 'name', label: 'Patient Name', type: 'text', placeholder: 'Enter patient name' },

  { name: 'age', label: 'Age', type: 'number', placeholder: 'Enter age' },

  {
    name: 'gender',
    label: 'Gender',
    type: 'select',
    options: ['Male', 'Female', 'Other']
  },

  { name: 'bloodType', label: 'Blood Type', type: 'text', placeholder: 'A+, O-, etc.' },

  { name: 'medicalCondition', label: 'Medical Condition', type: 'text', placeholder: 'e.g., Diabetes' },

  { name: 'doctor', label: 'Doctor Name', type: 'text', placeholder: 'Enter doctor name' },

  { name: 'hospital', label: 'Hospital Name', type: 'text', placeholder: 'Enter hospital name' },

  { name: 'admissionDate', label: 'Admission Date', type: 'date' },

  { name: 'billingAmount', label: 'Billing Amount', type: 'number', placeholder: 'Enter amount' },

  { name: 'insuranceProvider', label: 'Insurance Provider', type: 'text', placeholder: 'Enter provider name' },

  { name: 'roomNumber', label: 'Room Number', type: 'text', placeholder: 'Enter room no.' }
]);

  formFields$ = this.formFieldsSubject.asObservable();

  constructor() { }

  getFormFields(): FormField[] {
    return this.formFieldsSubject.value;
  }

  setFormFields(fields: FormField[]): void {
    this.formFieldsSubject.next(fields);
  }
}
