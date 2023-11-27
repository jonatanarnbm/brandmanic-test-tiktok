import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { genericTableComponent } from './generictable.component';
import { AdApiService } from '../../../services/adApi.service';

@Component({
  selector: 'app-ad-report',
  imports: [CommonModule, MatTableModule, genericTableComponent],
  standalone: true,
  template: `<app-generic-table
    [data]="data"
    [displayedColumns]="displayedColumns"
  ></app-generic-table> `,
})
export class queryAdReportResponse implements OnInit {
  data: any[] = [];
  subs: Subscription[] = [];
  displayedColumns: string[] = [];

  constructor(private readonly adApi: AdApiService) {}

  ngOnInit(): void {
    this.adApi.getqueryAdReportResponse();
    let sub = this.adApi
      .getTableAdReport()
      .asObservable()
      .subscribe((data) => {
        this.data = data;
      });
    this.subs.push(sub);
    sub = this.adApi
      .getFieldsAdReport()
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
