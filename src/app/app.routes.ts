import { Routes } from '@angular/router';
import { KanbanComponent } from './kanban/kanban.component';
import { DynamicTemplateComponent } from './dynamic-template/dynamic-template.component';
import { DynamicFilterComponent } from './dynamic-filter/dynamic-filter.component';

export const routes: Routes = [
  { path: 'kanban', component: KanbanComponent },
  { path: 'form', component: DynamicTemplateComponent },
  { path: 'filter', component: DynamicFilterComponent },
  { path: '', redirectTo: '/filter', pathMatch: 'full' }
];
