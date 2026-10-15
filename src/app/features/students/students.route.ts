import { Routes } from '@angular/router';

export const STUDENTS_ROUTES: Routes = [
    { path: '', redirectTo: 'directory', pathMatch: 'full' },
    { path: 'directory', loadComponent: () => import('./pages/directory/directory') },
    { path: 'groups', loadComponent: () => import('./pages/groups/groups') },
    { 
        path: ':id', 
        loadComponent: () => import('./pages/profile/profile'),
        children: [
            { path: '', redirectTo: 'overview', pathMatch: 'full' },
            { path: 'overview', loadComponent: () => import('./components/profile-overview/profile-overview')},
            { path: 'learning', loadComponent: () => import('./pages/learning/learning')},
            { path: 'assessments', loadComponent: () => import('./pages/assessments/assessments')},
            { path: 'attendance', loadComponent: () => import('./pages/attendance/attendance')},
            { path: 'assignments', loadComponent: () => import('./pages/assignments/assignments')},
            { path: 'communication', loadComponent: () => import('./pages/communication/communication')},
            { path: 'insights', loadComponent: () => import('./pages/insights/insights')}
        ]
    }
];

export default STUDENTS_ROUTES;