import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, throwError } from 'rxjs';
import { queryCommercialContentResponse } from '../utils/fakedata';

@Injectable({
  providedIn: 'root',
})
export class CommercialApiService {
  constructor(private http: HttpClient) {}
  tableComercial: Subject<any> = new Subject();
  fieldsComercial: Subject<string[]> = new Subject();
  getqueryCommercialContentResponse() {
    this.http
      .get<any>('test', {})
      .pipe(
        catchError((e) => {
          let test = JSON.parse(queryCommercialContentResponse);
          this.renderCommercialContentResponse(test);

          return throwError(e);
        })
      )
      .subscribe((res) => {
        let test = JSON.parse(res as string);
        // this.mapFieldsValues(test, true);
      });
  }
  renderCommercialContentResponse(json: any) {
    let fields: any = [];
    let data: any = [];

    let aux = {};
    let commercialcontents = json.data.commercial_contents;
    for (let cc of commercialcontents) {
      for (let key in cc) {
        if (key == 'creator') {
          for (const subKey in cc[key]) {
            fields.push(subKey);
            let t: any = {};
            t[key] = cc[key][subKey];
            aux = { ...aux, ...t };
          }
        } else if (key == 'videos') {
          fields.push(key);
          let text = '';
          for (let v of cc[key]) {
            text +=
              v.id +
              ' ' +
              v.status +
              ' ' +
              v.cover_image_url +
              ' ' +
              v.url +
              ' || ';
          }
          let t: any = {};
          t[key] = text;
          aux = { ...aux, ...t };
        } else {
          fields.push(key);
          let t: any = {};
          t[key] = cc[key];
          aux = { ...aux, ...t };
        }
      }
    }
    this.fieldsComercial.next(fields);
    this.tableComercial.next([{ ...aux }]);
  }

  getTableComercial() {
    return this.tableComercial;
  }
  getFieldsComercial() {
    return this.fieldsComercial;
  }
}
