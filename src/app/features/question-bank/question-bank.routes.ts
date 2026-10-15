import { Routes } from '@angular/router';

const QUESTION_BANK_ROUTES: Routes = [
    { path: '', redirectTo: 'topic', pathMatch: 'full' },
    { path: 'topic', loadComponent: () => import('./pages/topics/topics') },
    { path: 'questions', loadComponent: () => import('./pages/questions/questions') },
    { path: 'passages', loadComponent: () => import('./pages/passages/passages') }
];

export default QUESTION_BANK_ROUTES;
