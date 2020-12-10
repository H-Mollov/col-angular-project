import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { BillsService } from '../bills.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  billListStyle = "display: none";
  billDescriptionStyle = "display: none";

  allBills: any;
  allBillsTotalAmount: number = 0;
  currentBill = {
    "owedAmountTOTAL": 0,
    "institution": "",
    "owedAmount": "",
    "month": 0,
    "owedBy": "",
    "name": "",
    "owebBy": "",
    "institutionDescription": ""
  };
  cbOwedAmount: any;
  cbOwedAmountTotal: number = 0;
  cbOwedBy: any;

  constructor(
    private billsService: BillsService
  ) { }

  ngOnInit(): void {
    this.billsService.getAllBills().subscribe(allBills => {
      this.allBills = allBills;
      this.allBills.forEach((bill) => {
        JSON.parse(bill.owedAmount).forEach((entry) => {
          bill.owedAmountTOTAL += Number(entry.amount);
          this.allBillsTotalAmount += Number(entry.amount);
        })
      })
    });
  }

  showBillDescription(id: string): any {
    this.billDescriptionStyle = "display: flex";
    this.currentBill = this.allBills.find((el) => el.objectId === id);
    this.cbOwedAmount = JSON.parse(this.currentBill.owedAmount);

    this.cbOwedAmountTotal = 0;
    this.cbOwedAmount.forEach((entry) => this.cbOwedAmountTotal += Number(entry.amount));
    
    this.cbOwedBy = JSON.parse(this.currentBill.owedBy);
  }


}
