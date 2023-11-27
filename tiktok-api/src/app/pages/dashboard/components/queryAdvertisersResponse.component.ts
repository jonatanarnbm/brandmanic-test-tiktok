import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TiktokService } from '../../../services/tiktok.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { genericTableComponent } from './generictable.component';
import { AdvertiserApiService } from '../../../services/AdvertiserApi.service';

@Component({
  selector: 'app-advertisers',
  imports: [CommonModule, MatTableModule, genericTableComponent],
  standalone: true,
  template: `<app-generic-table
    [data]="data"
    [displayedColumns]="displayedColumns"
  ></app-generic-table>`,
})
export class queryAdvertisersResponse implements OnInit {
  data: any[] = [];
  subs: Subscription[] = [];
  displayedColumns: string[] = [];

  constructor(private readonly advertiserApi: AdvertiserApiService) {}

  ngOnInit(): void {
    this.advertiserApi.getqueryAdvertisersResponse();
    let sub = this.advertiserApi
      .getTableAdvertiser()
      .asObservable()
      .subscribe((data) => {
        this.data = data;
      });
    this.subs.push(sub);
    sub = this.advertiserApi
      .getFieldsAdvertiser()
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
