import { Component, Input, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [MatTableModule],

  template: ` @if (data.length >0) {
    <table mat-table [dataSource]="data" class="mat-elevation-z8">
      @for (column of displayedColumns; track column) {
      <ng-container [matColumnDef]="column">
        <th mat-header-cell *matHeaderCellDef>{{ column }}</th>
        <td mat-cell *matCellDef="let element">{{ element[column] }}</td>
      </ng-container>
      }
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
    </table>
    }`,
})
export class genericTableComponent implements OnInit {
  constructor() {}

  @Input() data: any[] = [];
  @Input() displayedColumns: string[] = [];
  ngOnInit(): void {}
}
