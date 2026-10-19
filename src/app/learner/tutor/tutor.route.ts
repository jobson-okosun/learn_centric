import { Routes } from '@angular/router';

const TUTOR_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/workspace/workspace'),
  },
];

export default TUTOR_ROUTES;
