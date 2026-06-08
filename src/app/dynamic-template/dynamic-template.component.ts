import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DynamicTemplateService, TemplateStyle, FormField } from '../dynamic-template.service';

@Component({
  selector: 'app-dynamic-template',
  templateUrl: './dynamic-template.component.html',
  styleUrls: ['./dynamic-template.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DynamicTemplateComponent implements OnInit, OnChanges {
  @Input() fields: FormField[] = [];
  @Input() formTitle: string = 'Contact Us';
  @Input() templateName: string = 'Classic Light';

  templateNames: string[] = []; //stores template names
  selectedTemplate: string = 'Classic Light';//default template
  template!: TemplateStyle;//template object to hold styles and layout info
  formData: { [key: string]: string } = {};//stores user input from form fields
  
  // Colour options per template
  colorOptionsPerTemplate: { [key: string]: string[] } = {
    'Classic Light': ['#2563eb', '#16a34a', '#a855f7', '#dc2626', '#0891b2', '#ea580c'],
    'Modern Clean': ['#667eea', '#f59e0b', '#10b981', '#ef4444', '#06b6d4', '#8b5cf6'],
    'Elegant Dark': ['#06b6d4', '#8b5cf6', '#ec4899', '#f59e0b', '#d4066d', '#10b981']
  };
  //Default colours of template
  selectedColors: { [key: string]: string } = {
    'Classic Light': '#2563eb',
    'Modern Clean': '#667eea',
    'Elegant Dark': '#06b6d4'
  };

  constructor(private templateService: DynamicTemplateService) {}

  ngOnInit(): void {
    this.templateNames = this.templateService.getTemplateNames();
    this.selectedTemplate = this.templateName;
    this.applyTemplate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['templateName']) {
      this.selectedTemplate = this.templateName;
      this.applyTemplate();
    }
  }

  onTemplateChange(): void {
    this.applyTemplate();
  }

  private applyTemplate(): void {
    this.template = this.templateService.getTemplate(this.selectedTemplate);
  }

  get dropdownLabelColor(): string {
    const bg = this.template?.page?.['background'] || '';
    const darkBgs = ['1a1f2e', '252d3d', '667eea', '764ba2'];
    return darkBgs.some(c => bg.includes(c)) ? '#ffffff' : '#374151';
  }

  get currentLayoutColors(): string[] {
    return this.colorOptionsPerTemplate[this.selectedTemplate] || [];
  }

  get currentAccentColor(): string {
    return this.selectedColors[this.selectedTemplate] || '#2563eb';
  }

  onColorChange(color: string): void {
    this.selectedColors[this.selectedTemplate] = color;
  }

  get buttonStyle(): { [key: string]: string } {
    if (this.selectedTemplate === 'Minimal Earthy') {
      return this.template?.button || {};
    }
    return {
      ...this.template?.button,
      'background': this.currentAccentColor
    };
  }

  get inputStyle(): { [key: string]: string } {
    if (this.selectedTemplate === 'Minimal Earthy') {
      return this.template?.input || {};
    }
    return {
      ...this.template?.input,
      'borderColor': this.currentAccentColor
    };
  }

  get titleStyle(): { [key: string]: string } {
    if (this.selectedTemplate === 'Minimal Earthy') {
      return this.template?.title || {};
    }
    return {
      ...this.template?.title,
      'color': this.currentAccentColor
    };
  }
}
