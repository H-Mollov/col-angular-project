import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private _currentUser: BehaviorSubject<any | null> = new BehaviorSubject(undefined);
  currentUser = this._currentUser.asObservable();

  apiUrl: string = environment.apiURL;
  user = environment.endPoint.user;

  constructor(
    private http: HttpClient
  ) { }

  login(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${this.user.login}`, userData).pipe(
      tap((user: any) => this._currentUser.next(user)),
    )
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${this.user.register}`, userData).pipe(
      tap((user: any) => this._currentUser.next(user)),
    )
  }

  logout(): Observable<any> {
    return this.http.get(`${this.apiUrl}${this.user.logout}`, {
      headers: {['user-token']: `USER TOKEN SHOULD BE PUT HERE`}
    }).pipe(
      tap((user: any) => this._currentUser.next(null))
    )
  }
}
