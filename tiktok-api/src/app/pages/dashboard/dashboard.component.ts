import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { queryUserInfoResponseComponent } from './components/queryUserInfoResponse.component';
import { queryAdvertisersResponse } from './components/queryAdvertisersResponse.component';
import { queryAdsResponse } from './components/queryAdsResponse.component';
import { queryAdDetailResponse } from './components/queryAdDetailResponse.component';
import { queryAdReportResponse } from './components/queryAdReportResponse.component';
import { queryCommercialContentResponse } from './components/queryCommercialContentResponse.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatTabsModule,
    queryUserInfoResponseComponent,
    queryAdvertisersResponse,
    queryAdsResponse,
    queryAdDetailResponse,
    queryAdReportResponse,
    queryCommercialContentResponse,
  ],
  template: `
    <div class="bg-green-50 h-full">
      <mat-tab-group>
        <mat-tab label="Ads"> <app-ads></app-ads> </mat-tab>
        <mat-tab label="User info ">
          <app-user-info></app-user-info>
        </mat-tab>

        <mat-tab label="Adverstisers">
          <app-advertisers></app-advertisers>
        </mat-tab>
        <mat-tab label="Ad detail"> <app-ad-detail></app-ad-detail> </mat-tab>
        <mat-tab label="Ad report"> <app-ad-report></app-ad-report> </mat-tab>
        <mat-tab label="Commercial content">
          <app-commercial-content></app-commercial-content>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styleUrl: './dashboard.component.sass',
})
export class DashboardComponent {
  constructor() {}

  ngOnInit(): void {}
}
