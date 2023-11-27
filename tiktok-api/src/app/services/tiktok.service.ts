import { Injectable } from '@angular/core';
import {
  queryUserInfoResponse,
  queryAdvertisersResponse,
  queryAdReportResponse,
  queryAdDetailResponse,
  queryCommercialContentResponse,
  queryAdsResponse,
} from '../utils/fakedata';
import {
  fieldsTalbe,
  queryAdvertisersResponseInterface,
  queryUserInfoResponseInterface,
} from '../intefaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { Subject, catchError, map, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TiktokService {
  constructor(private http: HttpClient) {}
  queryUserData: Subject<queryUserInfoResponseInterface> = new Subject();
  queryAdDetail: Subject<any> = new Subject();
  queryAdDetailsGroup: Subject<any> = new Subject();
  queryAdDetailsAdvertiser: Subject<any> = new Subject();
  fieldsTableUser: Subject<any> = new Subject();
  fieldsTableAdDetails: Subject<any> = new Subject();
  fieldsTableAdDetailsGroup: Subject<any> = new Subject();
  fieldsTableAdDetailsAdvertiser: Subject<any> = new Subject();
  fields: Subject<string[]> = new Subject();
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
      .get<queryUserInfoResponseInterface>('test', {})
      .pipe(
        catchError((e) => {
          let test = JSON.parse(
            queryUserInfoResponse
          ) as queryUserInfoResponseInterface;
          //    this.mapFieldsValues(test, true);
          this.queryUserData.next(test);
          return e;
        })
      )
      .subscribe((res) => {
        let test = JSON.parse(res as string) as queryUserInfoResponseInterface;
        //this.mapFieldsValues(test, true);
        this.queryUserData.next(test);
      });
  }
  getqueryAdvertisersResponse() {
    this.http
      .get<any>('test', {})
      .pipe(
        catchError((e) => {
          let test = JSON.parse(queryAdvertisersResponse);
          this.renderAdvertiserData(test);
          this.queryUserData.next(test.data);
          return e;
        })
      )
      .subscribe((res) => {
        let test = JSON.parse(res as string);
        //  this.mapFieldsValues(test, true);
        this.queryUserData.next(test);
      });
  }
  getqueryAdReportResponse() {
    this.http
      .get<any>('test', {})
      .pipe(
        catchError((e) => {
          let test = JSON.parse(queryAdReportResponse);
          this.renderAdReportData(test);
          this.queryUserData.next(test.data);
          return e;
        })
      )
      .subscribe((res) => {
        let test = JSON.parse(res as string);
        //this.mapFieldsValues(test, true);
        this.queryUserData.next(test);
      });
  }
  getqueryAdDetailResponse() {
    this.http
      .get<any>('test', {})
      .pipe(
        catchError((e) => {
          let test = JSON.parse(queryAdDetailResponse);
          this.renderAdDetailData(test);
          this.queryUserData.next(test.data);
          return e;
        })
      )
      .subscribe((res) => {
        let test = JSON.parse(res as string);
        // this.mapFieldsValues(test, true);
        this.queryUserData.next(test);
      });
  }
  getqueryCommercialContentResponse() {
    this.http
      .get<any>('test', {})
      .pipe(
        catchError((e) => {
          let test = JSON.parse(queryCommercialContentResponse);
          this.renderCommercialContentResponse(test);
          this.queryUserData.next(test.data);
          return e;
        })
      )
      .subscribe((res) => {
        let test = JSON.parse(res as string);
        // this.mapFieldsValues(test, true);
        this.queryUserData.next(test);
      });
  }
  getqueryAdsResponse() {
    this.http
      .get<any>('test', {})
      .pipe(
        catchError((e) => {
          let test = JSON.parse(queryAdsResponse);
          this.renderAdData(test);
          this.queryUserData.next(test.data);
          return e;
        })
      )
      .subscribe((res) => {
        let test = JSON.parse(res as string);
        //this.mapFieldsValues(test, true);
        this.queryUserData.next(test);
      });
  }

  renderAdData = (json: any) => {
    let fields: any = [];
    let data: any = [];
    let ads = json.data.ads;
    let once = false;
    let aux = {};
    for (const adobj of ads) {
      const { ad, advertiser } = adobj;

      for (const key in ad) {
        if (!once) {
          fields.push(key);
        }
        if (key == 'videos') {
          let text = '';
          for (const video of ad[key]) {
            const { url } = video;
            text += url;
          }
          let t: any = {};
          t[key] = text;
          aux = { ...aux, ...t };
        } else if (key == 'image_urls') {
          let text = '';
          for (const img of ad[key]) {
            text += img;
          }

          let t: any = {};
          t[key] = text;
          aux = { ...aux, ...t };
        } else if (key == 'reach') {
          let t: any = {};
          t[key] = ad[key]['unique_user_seen'];
          aux = { ...t, ...aux };
        } else {
          let t: any = {};
          t[key] = ad[key];
          aux = { ...aux, ...t };
        }
      }
      for (const key in advertiser) {
        if (!once) {
          fields.push(key);
        }
        let t: any = {};
        t[key] = advertiser[key];
        aux = { ...aux, ...t };
      }
      once = true;
      data.push(aux);
    }
    this.fields.next(fields);
    this.fieldsTableUser.next(data);
  };
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
    this.fields.next(fields);
    this.fieldsTableUser.next(data);
  };
  renderAdDetailData = (json: any) => {
    let fieldsAd: any = [];
    let fieldsGroup: any = [];
    let fieldsAdvertiser: any = [];
    let data: any = [];
    let auxAd = {};
    let auxGroup = {};
    let auxAdvertiser = {};
    let advs = json.data.advertisers;
    let { ad, ad_group, advertiser } = json.data;

    for (const key in ad) {
      if (key == 'videos') {
        fieldsAd.push(key);
        let text = '';

        for (const video of ad[key]) {
          const { url } = video;
          text += url + ' || ';
        }
        let t: any = {};
        t[key] = text;

        auxAd = { ...auxAd, ...t };
      } else if (key == 'image_urls') {
        fieldsAd.push(key);
        let text = '';
        for (const img of ad[key]) {
          text += img + ' || ';
        }
        let t: any = {};
        t[key] = text;
        auxAd = { ...auxAd, ...t };
      } else if (key == 'reach') {
        fieldsAd.push(key + '.unique_users_seen');
        let t: any = {};
        t[key + '.unique_users_seen'] = ad[key]['unique_users_seen'];
        auxAd = { ...auxAd, ...t };
        for (const reachKey in ad[key]['unique_users_seen_by_country']) {
          fieldsAd.push(key + '.unique_users_seen_by_country.' + reachKey);

          let t: any = {};
          t[key + '.unique_users_seen_by_country.' + reachKey] =
            ad[key]['unique_users_seen_by_country'][reachKey];
          auxAd = { ...auxAd, ...t };
        }
      } else {
        fieldsAd.push(key);
        let t: any = {};
        t[key] = ad[key];
        auxAd = { ...auxAd, ...t };
      }
    }
    let target = ad_group.target;
    for (const key in target) {
      if (key == 'country') {
        fieldsGroup.push(key);
        let text = '';

        for (const value of target[key]) {
          text += value + ' || ';
        }
        let t: any = {};
        t[key] = text;

        auxGroup = { ...auxGroup, ...t };
      } else if (key == 'age' || key == 'gender') {
        for (const subKey in target[key]) {
          fieldsGroup.push(key + '.' + subKey);
          let t: any = {};
          t[key + '.' + subKey] = target[key][subKey];
          auxGroup = { ...auxGroup, ...t };
        }
      } else {
        fieldsGroup.push(key);
        let t: any = {};
        t[key] = target[key];
        auxGroup = { ...auxGroup, ...t };
      }
    }

    for (const key in advertiser) {
      if (key == 'tiktok_account') {
        for (const subKey in advertiser[key]) {
          fieldsAdvertiser.push(key + '.' + subKey);

          let t: any = {};
          t[key + '.' + subKey] = advertiser[key][subKey];
          auxAdvertiser = { ...auxAdvertiser, ...t };
        }
      } else {
        fieldsAdvertiser.push(key);
        let t: any = {};
        t[key] = advertiser[key];
        auxAdvertiser = { ...auxAdvertiser, ...t };
      }
    }
    this.fieldsTableAdDetails.next(fieldsAd);
    this.fieldsTableAdDetailsGroup.next(fieldsGroup);
    this.fieldsTableAdDetailsAdvertiser.next(fieldsAdvertiser);
    this.queryAdDetail.next([{ ...auxAd }]);
    this.queryAdDetailsGroup.next([{ ...auxGroup }]);
    this.queryAdDetailsAdvertiser.next([{ ...auxAdvertiser }]);
  };
  renderAdReportData(json: any) {
    let report = json.data.count_time_series_by_country;
    let fields: any = [];
    let data: any = [];

    let aux = {};
    for (const key in report) {
      let text = '';
      for (let data of report[key]) {
        fields.push(key);

        text += data.date + ' ' + data.count + ' || ';
      }
      let t: any = {};
      t[key] = text;
      aux = { ...aux, ...t };
    }
    fields = [...new Set(fields)];
    console.log(aux, fields);
    this.fields.next(fields);
    this.fieldsTableUser.next([{ ...aux }]);
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
    this.fields.next(fields);
    this.fieldsTableUser.next([{ ...aux }]);
  }
  getUserData() {
    return this.fieldsTableUser;
  }
  getqueryAdDetail() {
    return this.queryAdDetail;
  }
  getqueryAdDetailsGroup() {
    return this.queryAdDetailsGroup;
  }
  getqueryAdDetailsAdvertiser() {
    return this.queryAdDetailsAdvertiser;
  }
  getfieldsTableAdDetails() {
    return this.fieldsTableAdDetails;
  }
  getfieldsTableAdDetailsGroup() {
    return this.fieldsTableAdDetailsGroup;
  }
  getfieldsTableAdDetailsAdvertiser() {
    return this.fieldsTableAdDetailsAdvertiser;
  }
  getFields() {
    return this.fields;
  }
}
