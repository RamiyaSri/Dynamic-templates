import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplateStorageService {
  private apiUrl = 'http://localhost:5296/api/templates';

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  get(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${name}`);
  }

  save(name: string, data: any): Observable<any> {
    return this.http.post(this.apiUrl, { name, data: JSON.stringify(data) });
  }

  delete(name: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${name}`);
  }
}
