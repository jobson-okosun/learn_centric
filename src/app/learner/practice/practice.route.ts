import { Routes } from '@angular/router';

const PRACTICE_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/list/list'),
      },
      {
        path: ':id',
        loadComponent: () => import('./pages/runner/runner'),
      },
    ],
  },
];

export default PRACTICE_ROUTES;
