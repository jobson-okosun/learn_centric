import { Routes } from '@angular/router';

const RUBRIKS_ROUTES: Routes = [
    { path: '', loadComponent: () => import('./pages/list/list') },
];

export default RUBRIKS_ROUTES;
