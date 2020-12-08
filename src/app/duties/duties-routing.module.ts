import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AreasComponent } from './areas/areas.component';
import { CreateAreaComponent } from './create-area/create-area.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { AuthenticateGuard } from '../core/guards/authenticate.guard';


const routes: Routes = [
    {
        path: 'duties',
        redirectTo: 'duties/dashboard',
        pathMatch: 'full',
        canActivate: [AuthenticateGuard],
    },
    {
        path: 'duties/dashboard',
        component: DashboardComponent,
        canActivate: [AuthenticateGuard],
    },
    {
        path: 'duties/areas',
        component: AreasComponent,
        canActivate: [AuthenticateGuard],
    },
    {
        path: 'duties/areas/create',
        component: CreateAreaComponent,
        canActivate: [AuthenticateGuard],
    },
    {
        path: 'duties/checklist',
        component: ChecklistComponent,
        canActivate: [AuthenticateGuard],
    }
]

export const DutiesRoutingModule = RouterModule.forChild(routes);