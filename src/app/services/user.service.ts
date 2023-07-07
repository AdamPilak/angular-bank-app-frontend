import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NewUser } from '../models/newUser.model';
import { User } from '../models/user.model';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  username: string = '';
  USERS: string = 'http://127.0.0.1:8000/api/users';

  //Subscriptions
  userSubscription?: Subscription;

  constructor(private http: HttpClient) {}

  setUsername(username: string): void {
    this.username = username;
  }

  updateUserSaldo(userId: number, value: number, credit: number): Observable<any> {
     return this.http.put<any>(`${this.USERS}/${userId}`, {saldo: value, credit: credit});
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.USERS}/${username}`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.USERS);
  }

  // updateUser(id: number, user: User): Observable<any> {
  //   return this.http.put<any>(`${this.USERS}/${id}`, user);
  // }

  saveUser(newUser: NewUser): Observable<any> {
    return this.http.post<any>(this.USERS, newUser);
  }

  getLogsByUserId(id: number): Observable<any> {
    return this.http.get<any>(`http://127.0.0.1:8000/api/logs/${id}`);
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
