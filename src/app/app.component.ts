import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormField } from './dynamic-template.service';
import { DynamicTemplateComponent } from './dynamic-template/dynamic-template.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, DynamicTemplateComponent]
})
export class AppComponent {
  fields: FormField[] = [
    { name: 'firstName', label: 'First Name',    type: 'text',     placeholder: 'Ramiya' },
    { name: 'lastName',  label: 'Last Name',     type: 'text',     placeholder: 'Sri S' },
    { name: 'email',     label: 'Email Address', type: 'email',    placeholder: 'ramiya@example.com' },
    { name: 'phone',     label: 'Phone Number',  type: 'tel',      placeholder: '+91' },
    { name: 'role',      label: 'Role',          type: 'select',   options: ['Developer', 'Tester', 'Manager', 'Admin'] },
    { name: 'message',   label: 'Message',       type: 'textarea', placeholder: 'Type your message...' },
    { name: 'password',  label: 'Password',      type: 'password', placeholder: 'Enter your password' }
    
    
  ];
}


