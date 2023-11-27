import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class TiktokService {
  constructor(private http: HttpClient) {}
}
