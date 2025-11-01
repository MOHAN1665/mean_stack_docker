import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { DepartmentService } from '../departments/department.service';
import { Employee } from '../employee';

import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    CommonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  @Input() initialState: Employee | null = null;
  @Output() formSubmitted = new EventEmitter<Employee>();
  departments: any[] = [];

  employeeForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    position: ['', [Validators.required, Validators.minLength(5)]],
    level: ['junior', [Validators.required]],
    departmentId: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private departmentService: DepartmentService) {}

  ngOnInit(): void {
    this.departmentService.getDepartments().subscribe((data) => {
      this.departments = data;
    });

    if (this.initialState) {
      this.employeeForm.patchValue(this.initialState);
    }
  }

  get name() {
    return this.employeeForm.get('name')!;
  }
  get position() {
    return this.employeeForm.get('position')!;
  }

  submitForm() {
    if (this.employeeForm.valid) {
      this.formSubmitted.emit(this.employeeForm.value as Employee);
    }
  }
}
