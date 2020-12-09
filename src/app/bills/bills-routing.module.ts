import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './list/list.component';
import { PayBillsComponent } from './pay-bills/pay-bills.component';

const routes: Routes = [
    {
        path: 'bills',
        redirectTo: 'bills/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'bills/dashboard',
        component: DashboardComponent
    },
    {
        path: 'bills/list',
        component: ListComponent
    },
    {
        path: 'bills/create',
        component: CreateComponent
    },
    {
        path: 'bills/pay',
        component: PayBillsComponent
    }
]

export const BillsRoutingModule = RouterModule.forChild(routes);