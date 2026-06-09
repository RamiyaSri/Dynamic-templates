import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TaskService } from '../services/task.service';
import { DynamicTemplateService,TemplateStyle } from '../dynamic-template.service';
import { TemplateStorageService } from '../services/template-storage.service';
@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css'],
  providers: [TaskService]
})
export class KanbanComponent {

  tasks: any[] = [];
  columns: any[] = [];
  selectedTasks: any[] = [];
  selectedColumnId: number = 0;

  title = '';
  newColumn = '';
  dragTaskId: number | null = null;

  // Dynamic Template Properties
  templateService = inject(DynamicTemplateService);
  availableTemplates: string[] = [];
  selectedTemplateName: string = 'Classic Light';
  currentTemplate!: TemplateStyle;

 // Colour options per template
  colorOptionsPerTemplate: { [key: string]: string[] } = {
    'Classic Light': ['#2563eb', '#16a34a', '#a855f7', '#dc2626', '#0891b2', '#ea580c'],
    'Modern Clean': ['#667eea', '#f59e0b', '#10b981', '#ef4444', '#06b6d4', '#8b5cf6'],
    'Elegant Dark': ['#06b6d4', '#8b5cf6', '#ec4899', '#f59e0b', '#d4066d', '#10b981'],
    'Minimal Earthy': ['#a89884', '#8b7355', '#c4a574', '#9d8b7e', '#b8956a', '#6b5c54']
  };
  //Default colours of template
  selectedColors: { [key: string]: string } = {
    'Classic Light': '#2563eb',
    'Modern Clean': '#667eea',
    'Elegant Dark': '#06b6d4',
    'Minimal Earthy': '#a89884'
  };

  private service = inject(TaskService);
  private cd = inject(ChangeDetectorRef);
  private templateStorageService = inject(TemplateStorageService);
  savedTemplates: string[] = [];
  savedTemplateData: any[] = [];
  saveTemplateName = '';
  statusMessage = '';

  ngOnInit() {
    this.initializeTemplates();
    this.loadColumns();
    this.loadSavedTemplates();
  }

  // Template Methods
  initializeTemplates() {
    this.availableTemplates = this.templateService.getTemplateNames();
    this.applyTemplate();
  }

  applyTemplate() {
    this.currentTemplate = this.templateService.getTemplate(this.selectedTemplateName);
    this.cd.detectChanges();
  }

  onTemplateChange() {
    this.applyTemplate();
  }

  get dropdownLabelColor(): string {
    const bg = this.currentTemplate?.page?.['background'] || '';
    const darkBgs = ['1a1f2e', '252d3d', '667eea', '764ba2'];
    return darkBgs.some(c => bg.includes(c)) ? '#ffffff' : '#374151';
  }

  get currentLayoutColors(): string[] {
    return this.colorOptionsPerTemplate[this.selectedTemplateName] || [];
  }

  get currentAccentColor(): string {
    return this.selectedColors[this.selectedTemplateName] || '#2563eb';
  }

  onColorChange(color: string): void {
    this.selectedColors[this.selectedTemplateName] = color;
    this.cd.detectChanges();
  }

  get buttonStyle(): { [key: string]: string } {
    if (!this.currentTemplate || !this.currentTemplate.button) {
      return { 'background': this.currentAccentColor };
    }
    return {
      ...this.currentTemplate.button,
      'background': this.currentAccentColor
    };
  }

  get inputStyle(): { [key: string]: string } {
    if (!this.currentTemplate || !this.currentTemplate.input) {
      return { 'borderColor': this.currentAccentColor };
    }
    return {
      ...this.currentTemplate.input,
      'borderColor': this.currentAccentColor
    };
  }

  get titleStyle(): { [key: string]: string } {
    if (!this.currentTemplate || !this.currentTemplate.title) {
      return { 'color': this.currentAccentColor };
    }
    return {
      ...this.currentTemplate.title,
      'color': this.currentAccentColor
    };
  }

  // Template Storage Methods
  loadSavedTemplates() {
    this.templateStorageService.getAll().subscribe({
      next: (templates) => {
        this.savedTemplates = templates.map(t => t.name);
        this.savedTemplateData = templates;
      },
      error: (err) => {
        console.log('No saved templates found');
      }
    });
  }

  saveCurrentTemplate() {
    if (!this.saveTemplateName.trim()) {
      this.statusMessage = 'Please enter a template name';
      return;
    }

    const templateData = {
      templateName: this.selectedTemplateName,
      accentColor: this.currentAccentColor,
      columns: this.columns,
      tasks: this.tasks,
      selectedColumnId: this.selectedColumnId
    };

    this.templateStorageService.save(this.saveTemplateName, templateData).subscribe({
      next: () => {
        this.statusMessage = `Template "${this.saveTemplateName}" saved successfully!`;
        this.saveTemplateName = '';
        this.loadSavedTemplates();
      },
      error: (err) => {
        this.statusMessage = 'Error saving template: ' + (err.error?.error || err.message);
      }
    });
  }

  loadSavedTemplate(templateName: string) {
    this.templateStorageService.get(templateName).subscribe({
      next: (response) => {
        const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
        this.selectedTemplateName = data.templateName || this.selectedTemplateName;
        this.selectedColors[this.selectedTemplateName] = data.accentColor || this.selectedColors[this.selectedTemplateName];
        this.applyTemplate();

        if (data.columns && Array.isArray(data.columns)) {
          this.columns = [...data.columns];
        }

        if (data.tasks && Array.isArray(data.tasks)) {
          this.tasks = [...data.tasks];
        }

        if (data.selectedColumnId != null) {
          this.selectedColumnId = data.selectedColumnId;
        } else if (this.columns.length > 0) {
          this.selectedColumnId = this.columns[0].id;
        }

        this.cd.detectChanges();
        this.statusMessage = `Template "${templateName}" loaded!`;
      },
      error: (err) => {
        this.statusMessage = 'Error loading template: ' + (err.error?.error || err.message);
      }
    });
  }

  deleteSavedTemplate(templateName: string) {
    if (!confirm(`Delete template "${templateName}"?`)) return;
    
    this.templateStorageService.delete(templateName).subscribe({
      next: () => {
        this.statusMessage = `Template "${templateName}" deleted!`;
        this.loadSavedTemplates();
      },
      error: (err) => {
        this.statusMessage = 'Error deleting template: ' + (err.error?.error || err.message);
      }
    });
  }

  getTemplatePreviewColor(index: number): { [key: string]: string } {
    if (index < 0 || index >= this.savedTemplateData.length) {
      return { 'background': '#e5e7eb' };
    }
    
    const templateData = this.savedTemplateData[index];
    const data = typeof templateData.data === 'string' ? JSON.parse(templateData.data) : templateData.data;
    const accentColor = data.accentColor || '#3b82f6';
    
    return {
      'background': accentColor
    };
  }

  loadColumns() {
    this.service.getColumns().subscribe((res: any) => {
      this.columns = [...res];

      if (this.columns.length > 0) {
        this.selectedColumnId = this.columns[0].id;
      }
      this.loadTasks();
    });
  }

  loadTasks() {
    this.service.getTasks().subscribe((res: any) => {
      this.tasks = [...res];
      this.cd.detectChanges();
    });
  }

  addColumn() {
    if (this.newColumn.trim() === '') return;

    let exists = this.columns.some(
      c => c.name.toLowerCase() === this.newColumn.toLowerCase()
    );

    if (exists) {
      alert("Column already exists");
      this.newColumn = '';
      return;
    }

    this.service.addColumn(this.newColumn).subscribe(() => {
      this.newColumn = '';
      this.resetDragState();
      this.loadColumns();
    });
  }

  selectColumn(id: number) {
    this.selectedColumnId = id;
    this.selectedTasks = [];
  }

  toggleTask(t: any) {
    this.selectedColumnId = 0;

    const index = this.selectedTasks.indexOf(t);
    if (index > -1) {
      this.selectedTasks.splice(index, 1);
    } else {
      this.selectedTasks.push(t);
    }
  }

  addTask() {
    if (this.title.trim() === '' || this.selectedColumnId === 0) return;

    let exists = this.tasks.some(t =>
      t.title.toLowerCase().trim() === this.title.toLowerCase().trim()
    );

    if (exists) {
      alert("Task already exists in the board");
      this.title = '';
      return;
    }

    let columnTasks = this.getTasksByColumn(this.selectedColumnId);

    let task = {
      title: this.title.trim(),
      columnId: this.selectedColumnId,
      orderIndex: columnTasks.length
    };

    this.service.addTask(task).subscribe(() => {
      this.title = '';
      this.resetDragState();
      this.loadTasks();
    });
  }



  getTasksByColumn(id: number) {
    return this.tasks
      .filter(x => Number(x.columnId) === Number(id))
      .sort((a, b) => a.orderIndex - b.orderIndex);
  }

  resetDragState() {
    this.dragTaskId = null;
    this.selectedTasks = [];
  }

  start(task: any) {
    if (this.selectedTasks.length > 0) {
      if (!this.selectedTasks.includes(task)) {
        this.selectedTasks = [task];
      }
    } else {
      this.selectedTasks = [task];
    }

    this.dragTaskId = task.id;
  }

  allow(e: any) {
    e.preventDefault();
    e.stopPropagation();
  }

  handleDragStart(event: any, task: any) {
    event.dataTransfer.setData("text/plain", task.id.toString());
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.dropEffect = "move";

    this.start(task);
  }

  handleDragEnd() {
    this.resetDragState();
  }

  handleDrop(index: number, columnId: number) {
    if (this.selectedTasks.length === 0 && this.dragTaskId === null) {
      return;
    }
    let ok = confirm("Are you sure you want to move the selected tasks?");

    if (ok) {
      this.drop(columnId);
    } else {
      this.resetDragState();
    }
  }

  drop(columnId: number) {
    let draggedTasks: any[] = [];

    if (this.selectedTasks.length > 0) {
      draggedTasks = [...this.selectedTasks];
    } else if (this.dragTaskId !== null) {
      let t = this.tasks.find(x => x.id === this.dragTaskId);
      if (t) draggedTasks = [t];
    }

    draggedTasks.forEach(t => t.columnId = columnId);

    let updatedColumnTasks = this.tasks
      .filter(t => Number(t.columnId) === Number(columnId))
      .sort((a, b) => a.orderIndex - b.orderIndex);

    updatedColumnTasks.forEach((t, i) => {
      t.orderIndex = i;
    });

    this.service.moveMultiple(updatedColumnTasks).subscribe();
    this.resetDragState();
  }

  change(t: any) {
    this.service.updatePriority(t.id).subscribe(() => {
      this.resetDragState();
      this.loadTasks();
    });
  }

  clearAll() {
    let confirm_clear = confirm("Are you sure you want to clear the entire board?");
    if (confirm_clear) {
      this.service.clearAll().subscribe(() => {
        this.tasks = [];
        this.columns = [];
        this.resetDragState();
        this.loadColumns();
      });
    }
  }

  clearSelection() {
    this.selectedColumnId = 0;
    this.selectedTasks = [];
    this.dragTaskId = null;
  }
}
