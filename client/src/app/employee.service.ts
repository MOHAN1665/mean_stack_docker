import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // private url = 'http://localhost:5200';
  private url = environment.apiUrl;
  // private url = (window as any).API_URL || 'http://localhost:5200';
  employees$ = signal<Employee[]>([]);
  employee$ = signal<Employee>({} as Employee);
  
  constructor(private httpClient: HttpClient) { }

  private refreshEmployees() {
    this.httpClient.get<Employee[]>(`${this.url}/employees`)
      .subscribe(employees => {
        this.employees$.set(employees);
      });
  }

  getEmployees() {
    this.refreshEmployees();
    return this.employees$();
  }

  // getEmployee(id: string) {
  //   this.httpClient.get<Employee>(`${this.url}/employees/${id}`).subscribe(employee => {
  //     this.employee$.set(employee);
  //     return this.employee$();
  //   });
  // }


    getEmployee(id: string): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.url}/employees/${id}`).pipe(
      tap(employee => this.employee$.set(employee))
    );
  }

  createEmployee(employee: Employee) {
  return this.httpClient.post(`${this.url}/employees`, employee, { responseType: 'text' })
    .pipe(tap(() => this.refreshEmployees()));
}

  updateEmployee(id: string, employee: Employee) {
    return this.httpClient.put(`${this.url}/employees/${id}`, employee, { responseType: 'text' });
  }

  deleteEmployee(id: string) {
    return this.httpClient.delete(`${this.url}/employees/${id}`, { responseType: 'text' });
  }
}
