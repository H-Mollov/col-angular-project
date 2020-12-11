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

      if (this.currentUser.paidBills === null) {
        this.currentUserPaidBills = [];
      } else {
        this.currentUserPaidBills = JSON.parse(this.currentUser.paidBills);
      }

      this.currentMonthBills = this.allBills.filter((bills) => bills.month === currentMonth && !this.currentUserPaidBills.includes(bills.objectId));

      this.currentMonthBills.forEach((bill) => { //Parsing each bill's payers and filtering the ones for the current user only.
        const currentUserBill = JSON.parse(bill.owedBy).filter((entry) => entry.name === this.currentUser.name);

        if (currentUserBill.length !== 0) {
          this.currentUserBills.push({
            name: bill.name,
            amount: currentUserBill[0].amount,
            id: bill.objectId,
            paidBy: bill.paidBy
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
        const updatedBill = JSON.parse(this.currentUserBills[i].paidBy);
        updatedBill.push(this.currentUser.name);
        this.billsService.updateBillById(this.currentUserBills[i].id, { "paidBy" : JSON.stringify(updatedBill)}).subscribe();

        this.paidUserBills.push(this.currentUserBills[i].id);
        this.currentUserBills.splice(i, 1);
      }
    }

    let updatedPaidBills;

    if (this.currentUser.paidBills === null) {
      updatedPaidBills = this.paidUserBills;
    } else {
      updatedPaidBills = JSON.parse(this.currentUser.paidBills).concat(this.paidUserBills);
    }

    const body = { "paidBills": JSON.stringify(updatedPaidBills) };

    this.user.updateUser(body).subscribe();
  }
}
