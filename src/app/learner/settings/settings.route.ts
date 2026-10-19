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
        path: 'academic',
        loadComponent: () => import('./pages/academic/academic'),
      },
      {
        path: 'notifications',
        loadComponent: () => import('./pages/notifications/notifications'),
      },
      {
        path: 'preferences',
        loadComponent: () => import('./pages/preferences/preferences'),
      },
      {
        path: 'security',
        loadComponent: () => import('./pages/security/security'),
      },
    ],
  },
];

export default SETTINGS_ROUTES;
