import { Routes } from '@angular/router';

const ASSESSMENTS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/list/list'),
  },
  {
    path: ':id/runner',
    loadComponent: () => import('./pages/runner/runner'),
  },
  {
    path: ':id/result',
    loadComponent: () => import('./pages/result/result'),
  },
];

export default ASSESSMENTS_ROUTES;
 