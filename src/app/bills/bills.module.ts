import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './list/list.component';
import { PayBillsComponent } from './pay-bills/pay-bills.component';

import { BillsRoutingModule } from './bills-routing.module';



@NgModule({
  declarations: [
    DashboardComponent,
    ListComponent,
    PayBillsComponent
  ],
  imports: [
    CommonModule,
    BillsRoutingModule
  ]
})
export class BillsModule { }
