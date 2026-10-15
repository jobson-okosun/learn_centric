import { Routes } from '@angular/router';

const CONTENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/library/library').then(m => m.LibraryComponent)
  }
];

export default CONTENT_ROUTES;
