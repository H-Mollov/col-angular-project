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
    "created": 1607514562000,
    "owedAmountTOTAL": 0,
    "ownerId": null,
    "institution": "Софийска Вода",
    "owedAmount": "[{\"name\": \"Софийска Вода\", \"amount\": \"34,56\"}]",
    "month": 11,
    "owedBy": "[{name: 'Пешо', amount: '0'}, {name: 'Гошо', amount: '0'}, {name: 'Сашо', amount: '0'}, {name: 'Стамат', amount: '0'}]",
    "name": "Студена Вода",
    "___class": "bills",
    "owebBy": null,
    "updated": 1607539272000,
    "objectId": "39C3D8CB-40F7-453D-AFA9-79BA7A857871",
    "institutionDescription": "Клиентски № 123 456"
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
