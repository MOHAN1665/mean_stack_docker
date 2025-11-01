import { Routes } from '@angular/router';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
// import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { EmployeeEditComponent } from './edit-employee/edit-employee.component';

import { AddDepartmentComponent } from './departments/add-department/add-department.component';
import { DepartmentListComponent } from './departments/department-list/department-list.component';
import { EditDepartmentComponent } from './departments/edit-department/edit-department.component';

export const routes: Routes = [
  { path: '', component: EmployeesListComponent, title: 'Employees List' },
  { path: 'new', component: AddEmployeeComponent },
  // { path: 'edit/:id', component: EditEmployeeComponent },
  { path: 'edit/:id', component: EmployeeEditComponent },
  { path: 'departments', component: DepartmentListComponent },
  { path: 'departments/add', component: AddDepartmentComponent },
  { path: 'departments/edit/:id', component: EditDepartmentComponent },
];
