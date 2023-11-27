import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { genericTableComponent } from './generictable.component';
import { UserApiService } from '../../../services/userApi.service';

@Component({
  selector: 'app-user-info',
  imports: [CommonModule, MatTableModule, genericTableComponent],
  standalone: true,
  template: ` <div class="bg-green-50">
    <h2>User data</h2>

    <app-generic-table
      [data]="userData"
      [displayedColumns]="displayedColumns"
    ></app-generic-table>
  </div>`,
})
export class queryUserInfoResponseComponent implements OnInit {
  userData: any[] = [];
  subs: Subscription[] = [];
  displayedColumns: string[] = [];

  constructor(private readonly userApi: UserApiService) {}

  ngOnInit(): void {
    this.userApi.getqueryUserInfoResponse();
    let sub = this.userApi
      .getTableUserData()
      .asObservable()
      .subscribe((data) => {
        this.userData = data;
      });
    this.subs.push(sub);
    sub = this.userApi
      .getFieldsUser()
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
