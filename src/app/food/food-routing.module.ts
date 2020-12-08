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
        component: RecipesComponent,
        canActivate: [AuthenticateGuard],
    },
    {
        path: 'food/recipes/create',
        component: CreateRecipeComponent,
        canActivate: [AuthenticateGuard],
    },
    {
        path: 'food/settings',
        component: SettingsComponent,
        canActivate: [AuthenticateGuard],
    },
    {
        path: 'food/week-menu',
        component: WeekMenuComponent,
        canActivate: [AuthenticateGuard],
    },
    
]

export const FoodRoutingModule = RouterModule.forChild(routes);