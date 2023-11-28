import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    MatNativeDateModule,
  ],
  template: `<mat-form-field>
    <mat-label>Enter a date range</mat-label>
    <mat-date-range-input [formGroup]="range" [rangePicker]="picker">
      <input matStartDate formControlName="start" placeholder="Start date" />
      <input matEndDate formControlName="end" placeholder="End date" />
    </mat-date-range-input>
    <mat-hint>MM/DD/YYYY – MM/DD/YYYY</mat-hint>
    <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
    <mat-date-range-picker #picker></mat-date-range-picker>

    @if (range.controls.start.hasError('matStartDateInvalid')) {
    <mat-error>Invalid start date</mat-error>
    } @if (range.controls.end.hasError('matEndDateInvalid')) {
    <mat-error>Invalid end date</mat-error>
    }
  </mat-form-field>`,
})
export class DateComponent implements OnInit {
  constructor() {}
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  ngOnInit(): void {}
}
