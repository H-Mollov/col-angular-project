import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { ErrorDisplayService } from '../core/error-display.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BillsService {

  apiUrl: string = environment.apiURL;
  billsUrl: string = environment.endPoint.data.bills;

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private err: ErrorDisplayService
  ) { }

  jsonHeaders = () => {
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "user-token": this.cookie.get('user-token')
      })
    }
  }

  errorHandler(err: HttpErrorResponse) {
    this.err.showErrorMessage(err.error.message);
    return throwError(err);
  }


  createNewBill(billData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${this.billsUrl}`, billData, this.jsonHeaders()).pipe(
      catchError((err) => this.errorHandler(err)
      ));
  }

  getAllBills(): Observable<any> {
    return this.http.get(`${this.apiUrl}${this.billsUrl}`, this.jsonHeaders()).pipe(
      catchError((err) => this.errorHandler(err)
      ));;
  }

  getBillById(id: string): any {
    return this.http.get(`${this.apiUrl}${this.billsUrl}/${id}`).pipe(
      catchError((err) => this.errorHandler(err)
      ));;
  }

  updateBillById(id: string, billData: any) {
    return this.http.put(`${this.apiUrl}${this.billsUrl}/${id}`, billData, this.jsonHeaders()).pipe(
      catchError((err) => this.errorHandler(err)
      ));;
  }

  deleteBillById(id: string) {
    return this.http.delete(`${this.apiUrl}${this.billsUrl}/${id}`).pipe(
      catchError((err) => this.errorHandler(err)
      ));;
  }
}
