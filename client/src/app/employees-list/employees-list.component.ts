import { Component, OnInit, signal, computed } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-employees-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatDividerModule
  ],
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css'],
})
export class EmployeesListComponent implements OnInit {
  employees$ = signal<Employee[]>([]);
  searchTerm = '';
  loading = false;

  displayedColumns: string[] = [
    'employeeId',
    'name',
    'position',
    'level',
    'department',
    'action',
  ];

  filteredEmployees = computed(() => {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) return this.employees$();

    return this.employees$().filter(emp =>
      emp.name?.toLowerCase().includes(term) ||
      emp.position?.toLowerCase().includes(term) ||
      emp.employeeId?.toLowerCase().includes(term)
    );
  });

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.loading = true;
    this.employeeService.getEmployees();
    setTimeout(() => {
      this.employees$ = this.employeeService.employees$;
      this.loading = false;
    }, 500); // Simulated delay for smooth spinner
  }

  deleteEmployee(id: string): void {
    if (!confirm('Are you sure you want to delete this employee?')) return;

    this.employeeService.deleteEmployee(id).subscribe({
      next: () => this.fetchEmployees(),
    });
  }

  clearSearch(): void {
    this.searchTerm = '';
  }
}
