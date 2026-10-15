import { Routes } from '@angular/router';

const CLASSROOM_ROUTES: Routes = [
  { path: '', redirectTo: 'sessions', pathMatch: 'full' },
  {
    path: 'sessions',
    loadComponent: () => import('./pages/sessions/sessions'),
  },
  {
    path: 'classes',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/classes/classes'),
      },
      {
        path: ':id',
        loadComponent: () => import('./pages/details/details'),
      },
    ],
  },
  {
    path: 'calendar',
    loadComponent: () => import('./pages/calendar/calendar'),
  },
  {
    path: 'attendance',
    loadComponent: () => import('./pages/attendance/attendance'),
  },
];

export default CLASSROOM_ROUTES;
