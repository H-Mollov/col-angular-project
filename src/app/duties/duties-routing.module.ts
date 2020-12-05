import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AreasComponent } from './areas/areas.component';
import { CreateAreaComponent } from './create-area/create-area.component';
import { ChecklistComponent } from './checklist/checklist.component';


const routes: Routes = [
    {
        path: 'duties',
        redirectTo: 'duties/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'duties/dashboard',
        component: DashboardComponent
    },
    {
        path: 'duties/areas',
        component: AreasComponent
    },
    {
        path: 'duties/areas/create',
        component: CreateAreaComponent
    },
    {
        path: 'duties/checklist',
        component: ChecklistComponent
    }
]

export const DutiesRoutingModule = RouterModule.forChild(routes);