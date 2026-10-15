import { Routes } from '@angular/router';

const AUTH_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('./layout/layout'),
        children: [
            { path: 'login', loadComponent: () => import('./pages/login/login') },
            { path: 'register', loadComponent: () => import('./pages/register/register') },
            { path: 'forgot-password', loadComponent: () => import('./pages/forgot-password/forgot-password') },
            { path: '', redirectTo: 'login', pathMatch: 'full' }
        ]
    }
];

export default AUTH_ROUTES;
