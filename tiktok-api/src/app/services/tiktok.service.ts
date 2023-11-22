import { Injectable } from '@angular/core';
import {
  queryUserInfoResponse,
  queryAdvertisersResponse,
} from '../utils/fakedata';
import {
  queryAdvertisersResponseInterface,
  queryUserInfoResponseInterface,
} from '../intefaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, catchError, of, switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TiktokService {
  constructor(private http: HttpClient) {}
  queryUserData:Subject<queryUserInfoResponseInterface>  = new Subject;
  getqueryUserInfoResponse() {
    this.http.get<queryUserInfoResponseInterface>('', {}).subscribe(res =>{
        this.queryUserData.next(res);
    });
    

    let test = JSON.parse(
      queryUserInfoResponse
    ) as queryUserInfoResponseInterface;
  }
  getUserData(){
    return this.queryUserData;
  }
  getqueryAdvertisersResponse() {
    return this.mapqueryAdvertisersResponseInterface(
      queryAdvertisersResponse.data
    );
  }
  mapqueryAdvertisersResponseInterface(
    data: queryAdvertisersResponseInterface
  ) {
    // let cols:string[] = [];
    // for (const key in data) {
    //   if (data instanceof Array ) {
    //     for(const subKey in data[key]){
    //     }
    //   }
    //   else if (data instanceof Object ) {
    //   }
    //   else {cols.push(key)}
    // }
    // return cols
  }
  mapqueryUserInfoResponseInterface(
    data: queryUserInfoResponseInterface
  ): string[] {
    let cols: string[] = [];
    for (const key in data) {
      cols.push(key);
    }
    return cols;
  }
}
