import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { queryUserInfoResponseComponent } from './components/queryUserInfoResponse.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatTabsModule,
    queryUserInfoResponseComponent,
  ],
  template: `<mat-tab-group>
    <mat-tab label="User info api"> <app-user-info></app-user-info> </mat-tab>
  </mat-tab-group> `,
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor() {}

  ngOnInit(): void {}
}
