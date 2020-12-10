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

  private allBills: BehaviorSubject<any | null> = new BehaviorSubject([]);
  private currentBill: BehaviorSubject<any | null> = new BehaviorSubject({});

  constructor(
    private http: HttpClient,
    private user: AuthService,
  ) { }

  jsonHeaders = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "user-token": this.currentUser['user-token']
    })
  }

  get loadAllBills(): any {
    return this.allBills.value;
  }

  get loadCurrentBills(): any {
    return this.currentBill.value;
  }

  createNewBill(billData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}${this.billsUrl}`, billData, this.jsonHeaders);
  }

  getAllBills(): Observable<any> {
    return this.http.get(`${this.apiUrl}${this.billsUrl}`, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    }).pipe(
      tap((data: any) => this.allBills.next(data))
    )
  }

  getBillById(id: string): any {
    return this.http.get(`${this.apiUrl}${this.billsUrl}/${id}`).pipe(
      tap((data: any) => this.currentBill.next(data))
    )
  }

  updateBill(id: string, billData: any) {
    return this.http.put(`${this.apiUrl}${this.billsUrl}/${id}`, billData, this.jsonHeaders).pipe(
      tap((data: any) => this.currentBill.next(data))
    )
  }
}
