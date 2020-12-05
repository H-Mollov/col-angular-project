import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AreasComponent } from './areas/areas.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { CreateAreaComponent } from './create-area/create-area.component';

import { DutiesRoutingModule } from "./duties-routing.module";

@NgModule({
  declarations: [
    DashboardComponent, 
    AreasComponent, 
    ChecklistComponent, 
    CreateAreaComponent
  ],
  imports: [
    CommonModule,
    DutiesRoutingModule
  ]
})
export class DutiesModule { }
