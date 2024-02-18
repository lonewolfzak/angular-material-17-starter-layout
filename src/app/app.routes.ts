import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: "full"
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./components/dashboard/dashboard.component').then(x => x.DashboardComponent),
        data: { title: "Dashboard" }
    },
    {
        path: 'users',
        loadComponent: () => import('./components/users/users.component').then(x => x.UsersComponent),
        data: { title: "Users" }
    },
    {
        path: 'roles',
        loadComponent: () => import('./components/roles/roles.component').then(x => x.RolesComponent),
        data: { title: "Roles" }
    },
    {
        path: 'settings',
        loadComponent: () => import('./components/settings/settings.component').then(x => x.SettingsComponent),
        data: { title: "Settings" }
    },
];
