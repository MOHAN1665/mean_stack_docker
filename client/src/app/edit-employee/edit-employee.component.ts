import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [CommonModule, EmployeeFormComponent],
  template: `
    <div *ngIf="employee(); else loading">
      <app-employee-form
        [initialState]="employee()"
        (formSubmitted)="onSubmit($event)">
      </app-employee-form>
    </div>

    <ng-template #loading>
      <p>Loading employee details...</p>
    </ng-template>
  `
})
export class EmployeeEditComponent implements OnInit {
  employee = signal<Employee | null>(null);

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeService.getEmployee(id).subscribe({
        next: (emp) => this.employee.set(emp),
        error: (err) => {
          console.error('Error fetching employee:', err);
          alert('Failed to load employee details');
          this.router.navigate(['/']);
        },
      });
    }
  }

  onSubmit(updated: Employee) {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.employeeService.updateEmployee(id, updated).subscribe({
      next: () => {
        alert('Employee updated successfully!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Update failed:', err);
        alert('Failed to update employee');
      },
    });
  }
}
