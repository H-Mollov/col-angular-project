import { Routes, RouterModule } from '@angular/router';
import { AuthenticateGuard } from '../core/guards/authenticate.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { RecipesComponent } from './recipes/recipes.component';
import { SettingsComponent } from "./settings/settings.component";
import { WeekMenuComponent } from './week-menu/week-menu.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';


const routes: Routes = [
    {
        path: 'food',
        redirectTo: 'food/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'food/dashboard',
        canActivate: [AuthenticateGuard],
        component: DashboardComponent
    },
    {
        path: 'food/recipes',
        component: RecipesComponent
    },
    {
        path: 'food/recipes/create',
        component: CreateRecipeComponent
    },
    {
        path: 'food/settings',
        component: SettingsComponent
    },
    {
        path: 'food/week-menu',
        component: WeekMenuComponent
    },
    
]

export const FoodRoutingModule = RouterModule.forChild(routes);