import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentService } from '../department.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-edit-department',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css']
})
export class EditDepartmentComponent implements OnInit {
  departmentId: string = '';
  departmentForm: FormGroup;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private departmentService: DepartmentService,
    private fb: FormBuilder
  ) {
    this.departmentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.departmentId = this.route.snapshot.paramMap.get('id') || '';
    this.fetchDepartment();
  }

  fetchDepartment(): void {
    this.departmentService.getDepartmentById(this.departmentId).subscribe({
      next: (data) => {
        this.departmentForm.patchValue({
          name: data.name,
          description: data.description
        });
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching department:', err);
        this.loading = false;
      },
    });
  }

  updateDepartment(): void {
    if (this.departmentForm.valid) {
      this.loading = true;
      this.departmentService.updateDepartment(this.departmentId, this.departmentForm.value).subscribe({
        next: () => {
          alert('✅ Department updated successfully!');
          this.router.navigate(['/departments']);
        },
        error: (err) => {
          console.error('Error updating department:', err);
          this.loading = false;
        },
      });
    }
  }

  // Convenience getters for easy access in template
  get name() { return this.departmentForm.get('name'); }
  get description() { return this.departmentForm.get('description'); }
}