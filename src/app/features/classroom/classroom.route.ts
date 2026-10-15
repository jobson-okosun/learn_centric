import { Routes } from '@angular/router';

const CLASSROOM_ROUTES: Routes = [
    {
        path: '',
        children: [
            { path: 'sessions', redirectTo: 'sessions/live', pathMatch: 'full' },
            { path: 'sessions/:tab', loadComponent: () => import('./sessions/list/list') },
            { path: 'calendar', loadComponent: () => import('./pages/calendar/calendar') },
            { path: 'attendance', loadComponent: () => import('./pages/attendance/attendance') },
            { path: '', redirectTo: 'sessions', pathMatch: 'full' }
        ]
    }
];

export default CLASSROOM_ROUTES;
