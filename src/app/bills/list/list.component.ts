import { Component, OnInit } from '@angular/core';
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
  currentMonthBills: any[] = [];

  //Current Bill Variables
  currentBill = {
    "owedAmountTOTAL": 0,
    "institution": "",
    "owedAmount": "",
    "month": 0,
    "owedBy": "",
    "name": "",
    "owebBy": "",
    "institutionDescription": "",
    "objectId": ""
  };
  cbOwedAmount: any;
  cbOwedAmountTotal: number = 0;
  cbOwedBy: any;

  constructor(
    private billsService: BillsService,
  ) { }

  ngOnInit(): void {
    this.billsService.getAllBills().subscribe(allBills => {
      this.allBills = allBills;
      const currentMonth = new Date().getUTCMonth();

      this.currentMonthBills = this.allBills.filter((bills) => bills.month === currentMonth);
      this.allBillsTotalAmount = 0;

      this.currentMonthBills.forEach((bill) => {
        JSON.parse(bill.owedAmount).forEach((entry) => {
          bill.owedAmountTOTAL += Number(entry.amount);
          this.allBillsTotalAmount += Number(entry.amount);
        })
      })
    });
  }

  showBillDescription(id: string): void {
    this.billDescriptionStyle = "display: flex";
    this.currentBill = this.allBills.find((el) => el.objectId === id);
    this.cbOwedAmount = JSON.parse(this.currentBill.owedAmount);

    this.cbOwedAmountTotal = 0;
    this.cbOwedAmount.forEach((entry) => this.cbOwedAmountTotal += Number(entry.amount));

    this.cbOwedBy = JSON.parse(this.currentBill.owedBy);
  }

  showBillsByMonth(month: number): void {
    this.currentMonthBills = this.allBills.filter((bills) => bills.month === month);
    this.allBillsTotalAmount = 0;

    this.currentMonthBills.forEach((bill) => {
      JSON.parse(bill.owedAmount).forEach((entry) => {
        bill.owedAmountTOTAL += Number(entry.amount);
        this.allBillsTotalAmount += Number(entry.amount);
      })
    })

  }

  editBillById(): void {
    console.log(this.currentBill);
  }

  deleteBillById(): void {
    this.billsService.deleteBillById(this.currentBill.objectId).subscribe();
    const index = this.currentMonthBills.findIndex((el) => el.objectId === this.currentBill.objectId);

    this.billDescriptionStyle = "display: none";
    this.currentMonthBills.splice(index, 1);
  }
}
