import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KanbanComponent } from './kanban/kanban.component';
import { DynamicTemplateComponent } from './dynamic-template/dynamic-template.component';

const routes: Routes = [
  { path: 'kanban', component: KanbanComponent },
  { path: 'form', component: DynamicTemplateComponent },
  { path: '', redirectTo: '/kanban', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
