import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TiktokService } from '../../../services/tiktok.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { genericTableComponent } from './generictable.component';
import { CommercialApiService } from '../../../services/commercialApi.service';

@Component({
  selector: 'app-commercial-content',
  imports: [CommonModule, MatTableModule, genericTableComponent],
  standalone: true,
  template: `<app-generic-table
    [data]="userData"
    [displayedColumns]="displayedColumns"
  ></app-generic-table>`,
})
export class queryCommercialContentResponse implements OnInit {
  userData: any[] = [];
  subs: Subscription[] = [];
  displayedColumns: string[] = [];

  constructor(private readonly commercialApi: CommercialApiService) {}

  ngOnInit(): void {
    this.commercialApi.getqueryCommercialContentResponse();
    let sub = this.commercialApi
      .getTableComercial()
      .asObservable()
      .subscribe((data) => {
        this.userData = data;
      });
    this.subs.push(sub);
    sub = this.commercialApi
      .getFieldsComercial()
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
