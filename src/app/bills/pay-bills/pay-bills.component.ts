import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { BillsService } from '../bills.service';

@Component({
  selector: 'app-pay-bills',
  templateUrl: './pay-bills.component.html',
  styleUrls: ['./pay-bills.component.css']
})
export class PayBillsComponent implements OnInit {

  currentUser = this.user.currentUser;
  currentUserPaidBills: string[] | null;

  allBills: any;
  currentMonthBills: any[] = [];

  currentUserBills: any[] = [];

  paidUserBills: string[] = [];

  constructor(
    private user: AuthService,
    private billsService: BillsService
  ) { }



  ngOnInit(): void {
    this.billsService.getAllBills().subscribe(allBills => {
      this.allBills = allBills;
      const currentMonth = new Date().getUTCMonth();

      if (this.currentUser.payedBills === null) {
        this.currentUserPaidBills = [];
      } else {
        this.currentUserPaidBills = JSON.parse(this.currentUser.payedBills);
      }

      this.currentMonthBills = this.allBills.filter((bills) => bills.month === currentMonth && !this.currentUserPaidBills.includes(bills.objectId));

      this.currentMonthBills.forEach((bill) => { //Parsing each bills, payers and filtering the ones for the current user only.
        const currentUserBill = JSON.parse(bill.owedBy).filter((entry) => entry.name === this.currentUser.name);

        if (currentUserBill.length !== 0) {
          this.currentUserBills.push({
            name: bill.name,
            amount: currentUserBill[0].amount,
            id: bill.objectId
          })
        }
      })
    });
  }

  formHandler(formData: any): void {
    const formDataValuesArray = Object.values(formData);

    for (let i = formDataValuesArray.length - 1; i >= 0; i--) {
      let checkedBill = formDataValuesArray[i];

      if (checkedBill === true) {
        this.paidUserBills.push(this.currentUserBills[i].id);
        this.currentUserBills.splice(i, 1);
      }
    }

    const body = { "payedBills": JSON.stringify(this.paidUserBills) }

    this.user.updateUser(body).subscribe()
  }
}
