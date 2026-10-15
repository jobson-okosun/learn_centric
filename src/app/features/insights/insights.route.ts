import { Routes } from '@angular/router';

export const INSIGHTS_ROUTES: Routes = [
    { path: '', redirectTo: 'class', pathMatch: 'full' },
    { path: 'class', loadComponent: () => import('./pages/class/class') },
    { path: 'students', loadComponent: () => import('./pages/students/students') },
    { path: 'assessments', loadComponent: () => import('./pages/assessments/assessments') },
    { path: 'mastery', loadComponent: () => import('./pages/mastery/mastery') },
    { path: 'ai-insights', loadComponent: () => import('./pages/ai-insights/ai-insights') }
];

export default INSIGHTS_ROUTES;
