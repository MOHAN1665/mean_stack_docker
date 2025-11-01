export interface Employee {
  employeeId?: string;
  name: string;
  position: string;
  level: 'junior' | 'mid' | 'senior';
  departmentId?: string;
  departmentName?: string;
  _id?: string;
}
