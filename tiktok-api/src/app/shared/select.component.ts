import { Component, Input, OnInit, Output } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  template: `<mat-form-field>
    <mat-label>{{ label }}</mat-label>
    <mat-select multiple [formControl]="valueControl">
      @for (data of dataQuery; track data) {
      <mat-option [value]="data">{{ data }}</mat-option>
      }
    </mat-select>
  </mat-form-field> `,
})
export class SelectComponent implements OnInit {
  constructor() {}
  @Input() dataQuery: string[] = [];
  @Input() label: string = '';
  valueControl = new FormControl();
  ngOnInit(): void {}
}
