import { Component, OnInit } from '@angular/core';
import { BillsService } from '../bills.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  allBills: any;

  currentMonthBills: any[] = [];
  currentMonthBillsTotalAmount: number = 0;

  currentUsersList: string[] = [];
  currentUsersBillInformation: any[] = [];

  constructor(
    private billsService: BillsService
  ) { }

  ngOnInit(): void {
    this.billsService.getAllBills().subscribe(allBills => {
      this.allBills = allBills;
      const currentMonth = new Date().getUTCMonth();

      this.currentMonthBills = this.allBills.filter((bills) => bills.month === currentMonth);
      this.currentMonthBillsTotalAmount = 0;

      this.currentMonthBills.forEach((bill) => {
        this.currentMonthBillsTotalAmount += bill.owedAmountTOTAL;

        const billPayers = JSON.parse(bill.owedBy);
        const alreadyPaid = JSON.parse(bill.paidBy);

        billPayers.forEach((payer) => {

          const index = this.currentUsersList.indexOf(payer.name);
          const hasPaidTheBill = alreadyPaid.includes(payer.name);

          if (index === -1) {
            this.currentUsersList.push(payer.name);
            this.currentUsersBillInformation.push({
              name: payer.name,
              bills: [{
                name: bill.name,
                amount: payer.amount,
                paid: hasPaidTheBill
              }]
            })
          } else {
            const currentPayer = this.currentUsersBillInformation[index];
            currentPayer.bills.push({
              name: bill.name,
              amount: payer.amount,
              paid: hasPaidTheBill
            })
          }
        })
      })
    });
  }
}
