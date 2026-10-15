import { Routes } from '@angular/router';

const CLASSES_ROUTES: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/list/list')
            },
            {
                path: ':id',
                loadComponent: () => import('./pages/details/details'),
                children: [
                    { path: '', redirectTo: 'overview', pathMatch: 'full' },
                    { path: 'overview', loadComponent: () => import('./pages/overview/overview') },
                    { path: 'roster', loadComponent: () => import('./pages/roster/roster') },
                    { path: 'attendance', loadComponent: () => import('./pages/attendance/attendance') },
                    { path: 'performance', loadComponent: () => import('./pages/performance/performance') },
                    { path: 'discussions', loadComponent: () => import('./pages/discussions/discussions') },
                    { path: 'calendar', loadComponent: () => import('./pages/calendar/calendar') },
                    { path: 'live', loadComponent: () => import('./pages/live/live') },
                    { path: 'settings', loadComponent: () => import('./pages/settings/settings') }
                ]
            }
        ]
    }
];

export default CLASSES_ROUTES
