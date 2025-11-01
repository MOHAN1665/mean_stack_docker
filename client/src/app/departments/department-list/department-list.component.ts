import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentService } from '../department.service';
import { RouterModule } from '@angular/router';

// Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-department-list',
  standalone: true,  
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],  
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  // Add the missing properties
  displayedColumns: string[] = ['number', 'name', 'description', 'actions'];
  departments: any[] = [];
  loading: boolean = false; // Add loading property

  constructor(private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.loading = true; // Set loading to true when starting
    this.departmentService.getDepartments().subscribe({
      next: (data) => {
        this.departments = data;
        this.loading = false; // Set loading to false when done
      },
      error: (err) => {
        console.error('Error fetching departments:', err);
        this.loading = false; // Set loading to false on error too
      }
    });
  }

  deleteDepartment(id: string): void {
    if (confirm('Are you sure you want to delete this department?')) {
      this.loading = true; // Optional: show loading during delete
      this.departmentService.deleteDepartment(id).subscribe({
        next: () => {
          alert('✅ Department deleted successfully!');
          this.loadDepartments(); // This will reset loading state
        },
        error: (err) => {
          console.error('Error deleting department:', err);
          this.loading = false; // Reset loading state on error
        }
      });
    }
  }
}