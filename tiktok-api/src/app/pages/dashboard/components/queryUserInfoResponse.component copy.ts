import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TiktokService } from '../../../services/tiktok.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-info',
  imports: [CommonModule, MatTableModule],
  standalone: true,
  template: `<table mat-table [dataSource]="userData" class="mat-elevation-z8">
    @for (column of displayedColumns; track column) {
    <ng-container [matColumnDef]="column">
      <th mat-header-cell *matHeaderCellDef>{{ column }}</th>
      <td mat-cell *matCellDef="let element">{{ element[column] }}</td>
    </ng-container>
    }
    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
  </table> `,
})
export class queryUserInfoResponseComponent implements OnInit {
  userData: any[] = [];
  subs: Subscription[] = [];
  displayedColumns: string[] = [];

  constructor(private readonly tiktokService: TiktokService) {}

  ngOnInit(): void {
    this.tiktokService.getqueryUserInfoResponse();
    let sub = this.tiktokService
      .getUserData()
      .asObservable()
      .subscribe((data) => {
        this.userData = data;
      });
    this.subs.push(sub);
    sub = this.tiktokService
      .getFields()
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
