import { BillsService } from '../bills.service'

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  owners: {}[] = [{ name: "", amount: "" }];
  payers: {}[] = [{ name: '', amount: '' }];

  constructor(
    private billService: BillsService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  formHandler(billData: any): void {
    const billDataKeys = Object.keys(billData);

    const ownerNameKeys = billDataKeys.filter((key) => key.includes("ownerName"));
    const ownerAmountKeys = billDataKeys.filter((key) => key.includes("ownerAmount"));

    const payerNameKeys = billDataKeys.filter((key) => key.includes("payerName"));
    const payerAmountKeys = billDataKeys.filter((key) => key.includes("ownedAmount"));

    const owedAmount = [];
    const owedByAmount = [];

    let owedAmountTOTAL = 0;

    for (let i = 0; i < ownerNameKeys.length; i++) {
      const objOwed = {
        name: billData[ownerNameKeys[i]],
        amount: billData[ownerAmountKeys[i]]
      }

      owedAmountTOTAL += Number(billData[ownerAmountKeys[i]]);
      owedAmount.push(objOwed);
    }

    for (let i = 0; i < payerNameKeys.length; i++) {
      const objOwedBy = {
        name: billData[payerNameKeys[i]],
        amount: billData[payerAmountKeys[i]]
      }

      owedByAmount.push(objOwedBy);
    }

    const currentMonth = new Date().getUTCMonth();

    const formatedBillData = {
      month: currentMonth,
      name: billData.name,
      institution: billData.institution,
      institutionDescription: billData.institutionDescription,
      owedAmount: JSON.stringify(owedAmount),
      owedBy: JSON.stringify(owedByAmount),
      owedAmountTOTAL: owedAmountTOTAL
    }

    this.billService.createNewBill(formatedBillData).subscribe(
      {
        next: (data) => {
          this.router.navigateByUrl("bills/list");
        },
        error: (err) => {
          console.error(err);
        }
      }
    );
  }

  addMoreOwnersHandler(): void {
    this.owners.push({
      name: "",
      amount: ""
    })
  }

  removeLastOwnerHandler(): void {
    this.owners.pop();
  }

  addMorePayersHandlers(): void {
    this.payers.push({
      name: "",
      amount: ""
    })
  }

  removeLastPayerHandler(): void {
    this.payers.pop()
  }

  consoleFormHandler(billData: any): void {
    console.log(billData);
  }
}
