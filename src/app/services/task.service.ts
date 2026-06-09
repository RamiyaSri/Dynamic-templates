import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TaskItem {
  id?: number;
  title: string;
  columnId: number;
  orderIndex: number;
  priority?: string;
}

export interface Column {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:5296/api/Tasks';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<TaskItem[]> {
    return this.http.get<TaskItem[]>(this.apiUrl);
  }

  getColumns(): Observable<Column[]> {
    return this.http.get<Column[]>(`${this.apiUrl}/columns`);
  }

  addTask(task: TaskItem): Observable<any> {
    return this.http.post(this.apiUrl, task);
  }

  addColumn(name: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/column?name=${name}`, {});
  }

  updatePriority(taskId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/priority?taskId=${taskId}`, {});
  }

  moveMultiple(tasks: TaskItem[]): Observable<any> {
    return this.http.put(`${this.apiUrl}/move-multiple`, tasks);
  }

  clearAll(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clear`);
  }
}
