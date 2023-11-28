import { Component, OnInit } from '@angular/core';
import { SelectComponent } from '../../../shared/select.component';
import { DateComponent } from '../../../shared/date.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-ad-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    DateComponent,
    SelectComponent,
    MatRadioModule,
    MatSliderModule,
  ],
  template: ` <div class="flex gap-3 m-2">
    <div class="pt-8">
      <mat-form-field>
        <mat-label>Search term </mat-label>
        <input matInput [(ngModel)]="search" [maxLength]="50" />
      </mat-form-field>
      <div>
        <label>Search type</label>
        <mat-radio-group class="flex flex-col" [(ngModel)]="search_type">
          <mat-radio-button value="exact_phrase">
            exact_phrase
          </mat-radio-button>
          <mat-radio-button value="fuzzy_phrase">
            fuzzy_phrase
          </mat-radio-button>
        </mat-radio-group>
      </div>
    </div>
    <div class="pt-8">
      <app-select [dataQuery]="fieldsQuery" label="Fields" />
    </div>
    <div class="pt-8"><app-date /></div>
    <div class="pt-8">
      <mat-form-field>
        <mat-label>Query count </mat-label>
        <input type="number" matInput maxlength="100" value="20" />
      </mat-form-field>
    </div>
    <div class="pt-8">
      <app-select [dataQuery]="countryQuery" label="Country" />
    </div>
    <div>
      <div class="h-8">
        <label><h4>unique_users_seen_size_range</h4></label>
      </div>
      <div class="flex gap-2">
        <mat-form-field>
          <mat-label>Min</mat-label>
          <input type="number" matInput />
        </mat-form-field>
        <mat-form-field>
          <mat-label>Max </mat-label>
          <input type="number" matInput />
        </mat-form-field>
      </div>
    </div>
  </div>`,
})
export class AdFormComponent implements OnInit {
  constructor() {}
  fieldsQuery: string[] = [
    'ad.id',
    'ad.first_shown_date',
    'ad.last_shown_date',
    'ad.status',
    'ad.status_statement',
    'ad.videos',
    'ad.image_urls',
    'ad.reach',
    'advertiser.business_id',
    'advertiser.business_name',
    'advertiser.paid_for_by',
  ];
  countryQuery: string[] = [
    'AT',
    'BE',
    'BG',
    'HR',
    'CY',
    'CZ',
    'DK',
    'EE',
    'FI',
    'FR',
    'DE',
    'HU',
    'IE',
    'IT',
    'LV',
    'LT',
    'LU',
    'MT',
    'NL',
    'PL',
    'PT',
    'RO',
    'SK',
    'SI',
    'ES',
    'SE',
  ];
  selectedFields: string[] = [];
  search_type: string = '';
  search: string = '';
  ad_published_date_range = { min: '', max: '' };
  country_code: string = '';
  ngOnInit(): void {}
}
