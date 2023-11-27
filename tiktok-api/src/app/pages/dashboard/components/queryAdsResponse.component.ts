import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TiktokService } from '../../../services/tiktok.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { genericTableComponent } from './generictable.component';
import { AdApiService } from '../../../services/adApi.service';

@Component({
  selector: 'app-ads',
  imports: [CommonModule, MatTableModule, genericTableComponent],
  standalone: true,
  template: `<app-generic-table
    [data]="data"
    [displayedColumns]="displayedColumns"
  ></app-generic-table>`,
})
export class queryAdsResponse implements OnInit {
  data: any[] = [];
  subs: Subscription[] = [];
  displayedColumns: string[] = [];

  constructor(private readonly adApi: AdApiService) {}

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
