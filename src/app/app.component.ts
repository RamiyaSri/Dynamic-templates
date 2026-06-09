import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FormField } from './dynamic-template.service';
import { FormDataService } from './services/form-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  providers: [FormDataService]
})
export class AppComponent implements OnInit {
  // Form field data is now managed by FormDataService (single source of truth)
  fields: FormField[] = [];

  private formDataService = inject(FormDataService);

  ngOnInit(): void {
    // Get form fields from service instead of defining them here
    this.fields = this.formDataService.getFormFields();
  }
}



