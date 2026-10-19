import { Routes } from '@angular/router';

const SETTINGS_ROUTES: Routes = [
  {
    path: '', 
    loadComponent: () => import('./pages/shell/shell'),
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile'),
      },
      {
        path: 'classroom',
        loadComponent: () => import('./pages/classroom/classroom'), 
      },
      {
        path: 'notifications',
        loadComponent: () => import('./pages/notifications/notifications'),
      },
      {
        path: 'security',
        loadComponent: () => import('./pages/security/security'),
      }, 
    ],
  },
];

export default SETTINGS_ROUTES;
