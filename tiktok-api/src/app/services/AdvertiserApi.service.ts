import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, throwError } from 'rxjs';
import { queryAdvertisersResponse } from '../utils/fakedata';

@Injectable({
  providedIn: 'root',
})
export class AdvertiserApiService {
  constructor(private http: HttpClient) {}

  tableAdvertiser: Subject<any> = new Subject();
  fieldsAdvertiser: Subject<string[]> = new Subject();

  getqueryAdvertisersResponse() {
    this.http
      .get<any>('test', {})
      .pipe(
        catchError((e) => {
          let test = JSON.parse(queryAdvertisersResponse);
          this.renderAdvertiserData(test);

          return throwError(e);
        })
      )
      .subscribe((res) => {
        let test = JSON.parse(res as string);
        //  this.mapFieldsValues(test, true);
      });
  }

  renderAdvertiserData = (json: any) => {
    let fields: any = [];
    let data: any = [];
    let aux = {};
    let advs = json.data.advertisers;
    let once = false;
    for (const adv of advs) {
      for (const key in adv) {
        if (!once) {
          fields.push(key);
        }
        let t: any = {};
        t[key] = adv[key];
        aux = { ...aux, ...t };
      }

      once = true;

      data.push(aux);
    }
    this.fieldsAdvertiser.next(fields);
    this.tableAdvertiser.next(data);
  };

  getTableAdvertiser() {
    return this.tableAdvertiser;
  }
  getFieldsAdvertiser() {
    return this.fieldsAdvertiser;
  }
}
