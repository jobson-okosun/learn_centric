import { Routes } from '@angular/router';

export default [
    { path: '', loadComponent: () => import('./pages/list/list') },
    {
        path: 'details/:id',
        loadComponent: () => import('./pages/details/details'),
        children: [
            { path: '', redirectTo: 'overview', pathMatch: 'full' },
            { path: 'overview', loadComponent: () => import('./pages/overview/overview') },
            { path: 'questions', loadComponent: () => import('./pages/questions/questions') },
            { path: 'settings', loadComponent: () => import('./pages/settings/settings') }
        ]
    },
    { path: 'grading', loadComponent: () => import('./pages/grading/grading') }
] as Routes;
