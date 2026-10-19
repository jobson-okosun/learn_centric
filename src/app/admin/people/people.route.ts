import { Routes } from '@angular/router';

export const PEOPLE_ROUTES: Routes = [
  { path: '', redirectTo: 'directory', pathMatch: 'full' },
  {
    path: 'directory',
    loadComponent: () => import('./pages/directory/directory'),
    title: 'User Directory — LearnCentric Admin',
  },
  {
    path: 'roles',
    loadComponent: () => import('./pages/roles/roles'),
    title: 'Roles & Permissions — LearnCentric Admin',
  },
  {
    path: 'invitations',
    loadComponent: () => import('./pages/invitations/invitations'),
    title: 'Invitations — LearnCentric Admin',
  },
];

export default PEOPLE_ROUTES;
