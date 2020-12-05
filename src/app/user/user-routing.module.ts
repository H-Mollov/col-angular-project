import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { MessagesComponent } from './messages/messages.component';

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
        component: ProfileComponent
    },
    {
        path: 'user/settings',
        component: SettingsComponent
    },
    {
        path: 'user/messages',
        component: MessagesComponent
    },
]

export const UserRoutingModule = RouterModule.forChild(routes);