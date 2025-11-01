// stats.service.ts
import { Injectable, effect } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EmployeeService } from './employee.service';
import { DepartmentService } from './departments/department.service';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private employeeCount = new BehaviorSubject<number>(0);
  private departmentCount = new BehaviorSubject<number>(0);

  public employeeCount$ = this.employeeCount.asObservable();
  public departmentCount$ = this.departmentCount.asObservable();

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService
  ) {
    // Use effect to watch for changes in the employee signal
    effect(() => {
      const employees = this.employeeService.employees$();
      this.employeeCount.next(employees.length);
    });

    // Load department count initially and watch for changes
    this.loadDepartmentCount();
  }

  private loadDepartmentCount(): void {
    // Since DepartmentService uses Observable, we subscribe to it
    this.departmentService.getDepartments().subscribe({
      next: (departments) => this.departmentCount.next(departments.length),
      error: (err) => console.error('Error loading department count:', err)
    });
  }

  // Methods to manually refresh counts
  refreshEmployeeCount(): void {
    const employees = this.employeeService.employees$();
    this.employeeCount.next(employees.length);
  }

  refreshDepartmentCount(): void {
    this.loadDepartmentCount();
  }

  // Manual update methods for when you add/delete items
  incrementEmployeeCount(): void {
    this.employeeCount.next(this.employeeCount.value + 1);
  }

  decrementEmployeeCount(): void {
    this.employeeCount.next(this.employeeCount.value - 1);
  }

  incrementDepartmentCount(): void {
    this.departmentCount.next(this.departmentCount.value + 1);
  }

  decrementDepartmentCount(): void {
    this.departmentCount.next(this.departmentCount.value - 1);
  }
}

// // stats.service.ts
// import { Injectable, effect, inject } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
// import { EmployeeService } from './employee.service';
// import { DepartmentService } from './departments/department.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class StatsService {
//   private employeeCount = new BehaviorSubject<number>(0);
//   private departmentCount = new BehaviorSubject<number>(0);

//   public employeeCount$ = this.employeeCount.asObservable();
//   public departmentCount$ = this.departmentCount.asObservable();

//   private employeeService = inject(EmployeeService);
//   private departmentService = inject(DepartmentService);

//   private initialized = false;

//   constructor() {
//     // Don't load data in constructor - it runs during build
//     // We'll initialize when the app starts running in browser
//   }

//   // Call this method when the app starts (in main.ts or app.component.ts)
//   initialize(): void {
//     if (this.initialized) return;
    
//     this.initialized = true;

//     // Use effect to watch for changes in the employee signal
//     effect(() => {
//       const employees = this.employeeService.employees$();
//       this.employeeCount.next(employees.length);
//     });

//     // Load department count - but only if we're in browser environment
//     if (typeof window !== 'undefined') {
//       this.loadDepartmentCount();
//     }
//   }

//   private loadDepartmentCount(): void {
//     this.departmentService.getDepartments().subscribe({
//       next: (departments) => this.departmentCount.next(departments.length),
//       error: (err) => {
//         // Only log error in browser, not during build
//         if (typeof window !== 'undefined') {
//           console.error('Error loading department count:', err);
//         }
//       }
//     });
//   }

//   // Methods to manually refresh counts
//   refreshEmployeeCount(): void {
//     const employees = this.employeeService.employees$();
//     this.employeeCount.next(employees.length);
//   }

//   refreshDepartmentCount(): void {
//     if (typeof window !== 'undefined') {
//       this.loadDepartmentCount();
//     }
//   }

//   // Manual update methods for when you add/delete items
//   incrementEmployeeCount(): void {
//     this.employeeCount.next(this.employeeCount.value + 1);
//   }

//   decrementEmployeeCount(): void {
//     this.employeeCount.next(this.employeeCount.value - 1);
//   }

//   incrementDepartmentCount(): void {
//     this.departmentCount.next(this.departmentCount.value + 1);
//   }

//   decrementDepartmentCount(): void {
//     this.departmentCount.next(this.departmentCount.value - 1);
//   }
// }