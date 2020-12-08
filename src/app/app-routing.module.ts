import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticateGuard } from './core/guards/authenticate.guard';
import { HomeGuestComponent } from './home-guest/home-guest.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home-guest',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthenticateGuard],
    data: {
      title: 'CoL - Home'
    }
  },
  {
    path: 'home-guest',
    component: HomeGuestComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
