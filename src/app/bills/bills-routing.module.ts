import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './list/list.component';
import { PayBillsComponent } from './pay-bills/pay-bills.component';
import { AuthenticateGuard } from '../core/guards/authenticate.guard';

const routes: Routes = [
    {
        path: 'bills',
        redirectTo: 'bills/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'bills/dashboard',
        component: DashboardComponent,
        canActivate: [AuthenticateGuard]
    },
    {
        path: 'bills/list',
        component: ListComponent,
        canActivate: [AuthenticateGuard]
    },
    {
        path: 'bills/create',
        component: CreateComponent,
        canActivate: [AuthenticateGuard]
    },
    {
        path: 'bills/edit/:id',
        component: CreateComponent,
        canActivate: [AuthenticateGuard]
    },
    {
        path: 'bills/pay',
        component: PayBillsComponent,
        canActivate: [AuthenticateGuard]
    }
]

export const BillsRoutingModule = RouterModule.forChild(routes);