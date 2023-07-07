import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Log } from '../models/log.model';
@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  API_KEY = '4b247d7be3-da700d8cb8-rodrjl';
  LOGS: string = 'http://127.0.0.1:8000/api/logs';
  USERS: string = 'http://127.0.0.1:8000/api/users';

  constructor(private http: HttpClient) {}

  saveLog(log: Log): Observable<any> {
    return this.http.post(this.LOGS, log);
  }

  test(from: string, to: string) {
    return this.http.get(`https://api.fastforex.io/convert?from=${from}&to=${to}&amount=1.00&api_key=${this.API_KEY}`);
  }
}
