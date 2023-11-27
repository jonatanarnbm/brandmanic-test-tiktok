import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, throwError } from 'rxjs';
import { queryUserInfoResponseInterface } from '../intefaces/interfaces';
import { queryUserInfoResponse } from '../utils/fakedata';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  constructor(private http: HttpClient) {}
  tableUserData: Subject<any> = new Subject();
  fieldsUser: Subject<any> = new Subject();

  getqueryUserInfoResponse() {
    /*
    this.http.get<queryUserInfoResponseInterface>('test', {}).pipe(
      tap((res: queryUserInfoResponseInterface) => {
        this.queryUserData.next(res);
      }),
      catchError((e) => {
        let test = JSON.parse(
          queryUserInfoResponse
        ) as queryUserInfoResponseInterface;
        this.queryUserData.next(test);
        return e;
      })
    );*/
    this.http
      .get<any>('test', {})
      .pipe(
        catchError((e) => {
          let test = JSON.parse(
            queryUserInfoResponse
          ) as queryUserInfoResponseInterface;
          //    this.mapFieldsValues(test, true);
          this.renderUserData(test);
          return throwError(e);
        })
      )
      .subscribe((res) => {
        let test = JSON.parse(res as string) as queryUserInfoResponseInterface;
        //this.mapFieldsValues(test, true);
      });
  }
  renderUserData = (json: any) => {
    let fields: any = [];
    let aux = {};
    for (const key in json) {
      fields.push(key);
      let t: any = {};
      t[key] = json[key];
      aux = { ...aux, ...t };
    }
    this.fieldsUser.next(fields);
    this.tableUserData.next([{ ...aux }]);
  };
  getFieldsUser() {
    return this.fieldsUser;
  }
  getTableUserData() {
    return this.tableUserData;
  }
}
