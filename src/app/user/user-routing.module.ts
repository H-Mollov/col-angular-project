import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthenticateGuard } from '../core/guards/authenticate.guard';

const routes: Routes = [
    {
        path: 'user/login',
        component: LoginComponent
    },
    {
        path: 'user/register',
        component: RegisterComponent
    },
    {
        path: 'user/profile',
        component: ProfileComponent,
        canActivate: [AuthenticateGuard]
    },
    {
        path: 'user/settings',
        component: SettingsComponent,
        canActivate: [AuthenticateGuard]
    },
    {
        path: 'user/messages',
        component: MessagesComponent,
        canActivate: [AuthenticateGuard]
    },
]

export const UserRoutingModule = RouterModule.forChild(routes);