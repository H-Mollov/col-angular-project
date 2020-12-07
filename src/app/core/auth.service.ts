import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, tap, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _currentUser: BehaviorSubject<any | null> = new BehaviorSubject(undefined);
  currentUser = this._currentUser.asObservable();

  apiUrl: string = environment.apiURL;
  user = environment.endPoint.user;

  isLogged = this.currentUser.pipe(map(user => !!user));

  jsonHeaders = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }

  constructor(private http: HttpClient) { }

  login(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${this.user.login}`, userData, this.jsonHeaders).pipe(
      tap((user: any) => {
        this._currentUser.next(user);
      }),
    )
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${this.user.register}`, userData).pipe(
      tap((user: any) => this._currentUser.next(user)),
    )
  }

  logout(): Observable<any> {
    return this.http.get(`${this.apiUrl}${this.user.logout}`, 
    {
      headers: new HttpHeaders({
        'user-token': this._currentUser.value['user-token']
      })
    }).pipe(
      tap((user: any) => {
        this._currentUser.next(null);
        console.log(this._currentUser.value);
      })
    )
  }
}
