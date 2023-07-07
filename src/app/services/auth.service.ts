import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, take } from 'rxjs';
import { UnknownUser } from '../models/unknownUser.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  CHECK: string = 'http://127.0.0.1:8000/api/check';
  LOGIN: string = 'http://127.0.0.1:8000/api/login';
  
  unknownUser: UnknownUser = new UnknownUser('', '');
  isUserValid: boolean = false;

  constructor(private router: Router, private http: HttpClient) {}

  setUnknownUser(username: string, password: string): void {
    this.unknownUser = new UnknownUser(username, password);
    this.router.navigate(['home']);
  }

  setLocalStorageUser(): void {
    localStorage.setItem('user', this.unknownUser.username);
  }

  checkIfUserExists(username: string): Observable<any> {
    return this.http.post(this.CHECK, {username: username});
  }

  checkIfUserIsValid(unknownUser: UnknownUser): Observable<any> {
    return this.http.post(this.LOGIN, unknownUser);
  }
}
