// app.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

// Services
import { StatsService } from './stats.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatDividerModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Employee Management System';
  isSidebarOpen = true;
  
  // Dynamic counts
  employeeCount: number = 0;
  departmentCount: number = 0;

  private statsSubscription = new Subscription();

  // Navigation items
  navItems = [
    { path: '/', icon: 'people', label: 'Employees', description: 'Manage team members' },
    { path: '/departments', icon: 'business', label: 'Departments', description: 'Organize departments' }
  ];

  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    // Subscribe to count updates
    this.statsSubscription.add(
      this.statsService.employeeCount$.subscribe(count => {
        this.employeeCount = count;
      })
    );

    this.statsSubscription.add(
      this.statsService.departmentCount$.subscribe(count => {
        this.departmentCount = count;
      })
    );
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  ngOnDestroy(): void {
    this.statsSubscription.unsubscribe();
  }
}