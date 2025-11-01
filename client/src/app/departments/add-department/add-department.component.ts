import { Component } from '@angular/core';
import { DepartmentService } from '../department.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-add-department',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent {
  departmentForm: FormGroup;
  submitting = false;

  constructor(
    private departmentService: DepartmentService, 
    private router: Router,
    private fb: FormBuilder
  ) {
    this.departmentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['']
    });
  }

  addDepartment(): void {
    if (this.departmentForm.valid && !this.submitting) {
      this.submitting = true;
      
      console.log('Adding department:', this.departmentForm.value);

      this.departmentService.addDepartment(this.departmentForm.value).subscribe({
        next: () => {
          alert('✅ Department added successfully!');
          this.router.navigate(['/departments']);
          this.submitting = false;
        },
        error: (err) => {
          console.error('Error adding department:', err);
          alert('❌ Error adding department. Please try again.');
          this.submitting = false;
        }
      });
    }
  }

  // Convenience getters for easy access in template
  get name() { return this.departmentForm.get('name'); }
  get description() { return this.departmentForm.get('description'); }
}