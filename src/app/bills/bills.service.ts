import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { AuthService } from '../core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BillsService {

  apiUrl: string = environment.apiURL;
  billsUrl: string = environment.endPoint.data.bills;

  currentUser = this.user.currentUser;

  constructor(
    private http: HttpClient,
    private user: AuthService,
  ) { }

  jsonHeaders = this.currentUser['user-token'] ?

    {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "user-token": this.currentUser['user-token']
      })
    } : {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      })
    };



  createNewBill(billData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${this.billsUrl}`, billData, this.jsonHeaders);
  }

  getAllBills(): Observable<any> {
    return this.http.get(`${this.apiUrl}${this.billsUrl}`, this.jsonHeaders);
  }

  getBillById(id: string): any {
    return this.http.get(`${this.apiUrl}${this.billsUrl}/${id}`);
  }

  updateBillById(id: string, billData: any) {
    return this.http.put(`${this.apiUrl}${this.billsUrl}/${id}`, billData, this.jsonHeaders);
  }

  deleteBillById(id: string) {
    return this.http.delete(`${this.apiUrl}${this.billsUrl}/${id}`);
  }
}
