import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, tap, map } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ErrorDisplayService } from './error-display.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private _currentUser: BehaviorSubject<any | null> = new BehaviorSubject(undefined);

  apiUrl: string = environment.apiURL;
  user = environment.endPoint.user;

  jsonHeaders = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private err: ErrorDisplayService
  ) { }

  // get currentUser(): any {
  //   return this._currentUser.value;
  // }

  errorHandler(err: HttpErrorResponse) {
    this.err.showErrorMessage(err.error.message);
    return throwError(err);
  }

  clearCookies(): void {
    this.cookie.delete("user-token", "/");
    this.cookie.delete("name", "/");
    this.cookie.delete("paidBills", "/");
    this.cookie.delete("id", "/");
  }

  login(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${this.user.login}`, userData, this.jsonHeaders).pipe(
      tap((user: any) => {
        const userToken = user["user-token"];
        const name = user.name;
        const paidBills = user.paidBills;
        const id = user.objectId;

        // this._currentUser.next(user);
        this.clearCookies();
        this.cookie.set("user-token", userToken, 1 , "/");
        this.cookie.set("name", name, 1 , "/");
        this.cookie.set("paidBills", paidBills, 1 , "/");
        this.cookie.set("id", id, 1 , "/")
      }),
      catchError((err) => this.errorHandler(err))
    )
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${this.user.register}`, userData).pipe(
      // tap((user: any) => this._currentUser.next(user)),
      catchError((err) => this.errorHandler(err))
    )
  }

  logout(): Observable<any> {
    return this.http.get(`${this.apiUrl}${this.user.logout}`,
      {
        headers: new HttpHeaders({
          'user-token': this.cookie.get("user-token")
        })
      }).pipe(
        tap((user: any) => {
          // this._currentUser.next(null);
          this.clearCookies();
        }),
        catchError((err) => this.errorHandler(err))
      )
  }

  updateUser(body: any): Observable<any> {
    const url = `${this.apiUrl}users/${this.cookie.get("id")}`;

    return this.http.put(url, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'user-token': this.cookie.get("user-token")
      })
    }).pipe(
      tap((user: any) => {
        const userToken = user["user-token"];
        const name = user.name;
        const paidBills = user.paidBills;
        const id = user.objectId;
        
        this.clearCookies();
        this.cookie.set("user-token", userToken, 1 , "/");
        this.cookie.set("name", name, 1 , "/");
        this.cookie.set("paidBills", paidBills, 1 , "/");
        this.cookie.set("id", id, 1 , "/")
      }),
      // tap((user: any) => this._currentUser.next(user)),
      catchError((err) => this.errorHandler(err))
    )
  }
}
