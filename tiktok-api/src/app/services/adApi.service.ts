import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, throwError } from 'rxjs';
import {
  queryAdDetailResponse,
  queryAdReportResponse,
  queryAdsResponse,
} from '../utils/fakedata';

@Injectable({
  providedIn: 'root',
})
export class AdApiService {
  constructor(private http: HttpClient) {}
  tableAdDetail: Subject<any> = new Subject();
  tableAdDetailsGroup: Subject<any> = new Subject();
  tableAdDetailsAdvertiser: Subject<any> = new Subject();
  fieldsAdDetails: Subject<any> = new Subject();
  fieldsAdDetailsGroup: Subject<any> = new Subject();
  fieldsAdDetailsAdvertiser: Subject<any> = new Subject();
  fieldsAdReport: Subject<string[]> = new Subject();
  tableAdReport: Subject<any> = new Subject();
  tableAds: Subject<any> = new Subject();
  fieldsAds: Subject<string[]> = new Subject();

  getqueryAdReportResponse() {
    this.http
      .get<any>('test', {})
      .pipe(
        catchError((e) => {
          let test = JSON.parse(queryAdReportResponse);
          this.renderAdReportData(test);

          return throwError(e);
        })
      )
      .subscribe((res) => {
        let test = JSON.parse(res as string);
        //this.mapFieldsValues(test, true);
      });
  }
  getqueryAdDetailResponse() {
    this.http
      .get<any>('test', {})
      .pipe(
        catchError((e) => {
          let test = JSON.parse(queryAdDetailResponse);
          this.renderAdDetailData(test);

          return throwError(e);
        })
      )
      .subscribe((res) => {
        let test = JSON.parse(res as string);
        // this.mapFieldsValues(test, true);
      });
  }
  getqueryAdsResponse() {
    this.http
      .get<any>('test', {})
      .pipe(
        catchError((e) => {
          let test = JSON.parse(queryAdsResponse);
          this.renderAdsData(test);

          return throwError(e);
        })
      )
      .subscribe((res) => {
        let test = JSON.parse(res as string);
        //this.mapFieldsValues(test, true);
      });
  }

  renderAdsData = (json: any) => {
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
    this.fieldsAds.next(fields);
    this.tableAds.next(data);
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
    this.fieldsAdReport.next(fields);
    this.tableAdReport.next([{ ...aux }]);
  }
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
    this.fieldsAdDetails.next(fieldsAd);
    this.fieldsAdDetailsGroup.next(fieldsGroup);
    this.fieldsAdDetailsAdvertiser.next(fieldsAdvertiser);
    this.tableAdDetail.next([{ ...auxAd }]);
    this.tableAdDetailsGroup.next([{ ...auxGroup }]);
    this.tableAdDetailsAdvertiser.next([{ ...auxAdvertiser }]);
  };
  getTableAdDetailsGroup() {
    return this.tableAdDetailsGroup;
  }
  getTableAdDetailsAdvertiser() {
    return this.tableAdDetailsAdvertiser;
  }
  getfieldsTableAdDetails() {
    return this.fieldsAdDetails;
  }
  getfieldsTableAdDetailsGroup() {
    return this.fieldsAdDetailsGroup;
  }
  getfieldsTableAdDetailsAdvertiser() {
    return this.fieldsAdDetailsAdvertiser;
  }
  getTableAdReport() {
    return this.tableAdReport;
  }
  getFieldsAdReport() {
    return this.fieldsAdReport;
  }
  getTableAdDetails() {
    return this.tableAdDetail;
  }
  getTableAds() {
    return this.tableAds;
  }
  getFieldsAds() {
    return this.fieldsAds;
  }
}
