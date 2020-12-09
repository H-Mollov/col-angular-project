import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './list/list.component';
import { PayBillsComponent } from './pay-bills/pay-bills.component';

import { BillsRoutingModule } from './bills-routing.module';
import { CreateComponent } from './create/create.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ListComponent,
    PayBillsComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    BillsRoutingModule
  ]
})
export class BillsModule { }
