import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { genericTableComponent } from './generictable.component';
import { AdApiService } from '../../../services/adApi.service';

@Component({
  selector: 'app-ad-detail',
  imports: [CommonModule, MatTableModule, genericTableComponent],
  standalone: true,
  template: `<app-generic-table
      [data]="adData"
      [displayedColumns]="displayedColumnsAd"
    ></app-generic-table>
    <app-generic-table
      [data]="groupData"
      [displayedColumns]="displayedColumnsGroup"
    ></app-generic-table>
    <app-generic-table
      [data]="advertiserData"
      [displayedColumns]="displayedColumnsAdvertiser"
    ></app-generic-table>`,
})
export class queryAdDetailResponse implements OnInit {
  adData: any[] = [];
  groupData: any[] = [];
  advertiserData: any[] = [];
  subs: Subscription[] = [];
  displayedColumnsAd: string[] = [];
  displayedColumnsGroup: string[] = [];
  displayedColumnsAdvertiser: string[] = [];
  constructor(private readonly adApi: AdApiService) {}

  ngOnInit(): void {
    this.adApi.getqueryAdDetailResponse();
    let sub = this.adApi
      .getTableAdDetails()
      .asObservable()
      .subscribe((data) => {
        this.adData = data;
      });
    this.subs.push(sub);
    sub = this.adApi
      .getTableAdDetailsGroup()
      .asObservable()
      .subscribe((data) => {
        this.groupData = data;
      });
    this.subs.push(sub);
    sub = this.adApi
      .getTableAdDetailsAdvertiser()
      .asObservable()
      .subscribe((data) => {
        this.advertiserData = data;
      });
    this.subs.push(sub);
    sub = this.adApi
      .getfieldsTableAdDetails()
      .asObservable()
      .subscribe((data) => {
        this.displayedColumnsAd = data;
      });
    this.subs.push(sub);
    sub = this.adApi
      .getfieldsTableAdDetailsGroup()
      .asObservable()
      .subscribe((data) => {
        this.displayedColumnsGroup = data;
      });
    this.subs.push(sub);
    sub = this.adApi
      .getfieldsTableAdDetailsAdvertiser()
      .asObservable()
      .subscribe((data) => {
        this.displayedColumnsAdvertiser = data;
      });
    this.subs.push(sub);
  }
  ngOnDestroy(): void {
    this.subs.map((s) => s.unsubscribe());
  }
}
