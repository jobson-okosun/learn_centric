import { Routes } from '@angular/router';

const ADMIN_ROUTES: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard'),
    title: 'Admin Dashboard — LearnCentric',
  },
  // {
  //   path: 'people',
  //   loadChildren: () => import('./people/people.route'),
  // },
];

export default ADMIN_ROUTES; 
 