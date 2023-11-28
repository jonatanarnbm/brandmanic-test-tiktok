import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TiktokService } from '../../../services/tiktok.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { genericTableComponent } from './generictable.component';
import { AdApiService } from '../../../services/adApi.service';
import { AdFormComponent } from './adform.component';

@Component({
  selector: 'app-ads',
  imports: [
    CommonModule,
    MatTableModule,
    genericTableComponent,
    AdFormComponent,
  ],
  standalone: true,
  template: ` <div class="flex gap-3 m-2 "></div>
    <app-ad-form />
    <app-generic-table
      [data]="data"
      [displayedColumns]="displayedColumns"
    ></app-generic-table>`,
})
export class queryAdsResponse implements OnInit {
  constructor(private readonly adApi: AdApiService) {}

  data: any[] = [];
  subs: Subscription[] = [];
  displayedColumns: string[] = [];

  ngOnInit(): void {
    this.adApi.getqueryAdsResponse();
    let sub = this.adApi
      .getTableAds()
      .asObservable()
      .subscribe((data) => {
        this.data = data;
      });
    this.subs.push(sub);
    sub = this.adApi
      .getFieldsAds()
      .asObservable()
      .subscribe((data) => {
        this.displayedColumns = data;
      });
    this.subs.push(sub);
  }
  ngOnDestroy(): void {
    this.subs.map((s) => s.unsubscribe());
  }
}
