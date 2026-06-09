import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicFilterService {

  private baseUrl = "http://localhost:5296/api/data";

  constructor(private http: HttpClient) { }

  // call backend filter API
  getFilteredData(params: any) {
    return this.http.get(`${this.baseUrl}/filter`, { params });
  }

  // initial load

  getData(dataset: string) {
    return this.http.get(`${this.baseUrl}/${dataset}`);
  }

  // call backend sort API
  getSortedData(params: any) {
    const httpParams = {
      dataset: params.dataset,
      column: params.sortColumn ?? params.column,
      order: params.sortOrder ?? params.order
    };

    return this.http.get(`${this.baseUrl}/sort`, { params: httpParams });
  }

}