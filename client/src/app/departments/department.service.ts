import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private apiUrl = 'http://localhost:5200/departments';

  constructor(private http: HttpClient) {}

  getDepartments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addDepartment(department: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, department);
  }

  deleteDepartment(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getDepartmentById(id: string): Observable<any> {
      return this.http.get(`${this.apiUrl}/${id}`);
    }

    updateDepartment(id: string, dept: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/${id}`, dept);
    }
}
