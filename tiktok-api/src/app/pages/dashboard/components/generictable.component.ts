import { Component, Input, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-generic-table',
  standalone: true,
  imports: [MatTableModule],

  template: ` <div
    class="table-responsive  w-full overflow-x-auto flex justify-center"
  >
    @if (data.length >0) {
    <mat-table
      mat-table
      [dataSource]="data"
      class="m-4 overflow-auto "
      style="width: fit-content;min-width:auto;box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;"
    >
      @for (column of displayedColumns; track column) {
      <ng-container [matColumnDef]="column">
        <th
          class=" test table-cell py-1 w-auto whitespace-nowrap overflow-hidden ver"
          mat-header-cell
          *matHeaderCellDef
        >
          {{ column }}
        </th>
        <td
          class=" test table-cell py-1 w-auto whitespace-nowrap overflow-hidden ver"
          mat-cell
          *matCellDef="let element"
        >
          {{ element[column] }}
        </td>
      </ng-container>
      }
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr
        class="table-row"
        mat-row
        *matRowDef="let row; columns: displayedColumns"
      ></tr>
    </mat-table>
    }
  </div>`,
})
export class genericTableComponent implements OnInit {
  constructor() {}

  @Input() data: any[] = [];
  @Input() displayedColumns: string[] = [];
  ngOnInit(): void {}
}
