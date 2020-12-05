import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecipesComponent } from './recipes/recipes.component';
import { WeekMenuComponent } from './week-menu/week-menu.component';
import { SettingsComponent } from './settings/settings.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';

import { FoodRoutingModule } from './food-routing.module';

@NgModule({
  declarations: [
    DashboardComponent, 
    RecipesComponent, 
    WeekMenuComponent, 
    SettingsComponent, 
    CreateRecipeComponent],
  imports: [
    CommonModule,
    FoodRoutingModule
  ]
})
export class FoodModule { }
