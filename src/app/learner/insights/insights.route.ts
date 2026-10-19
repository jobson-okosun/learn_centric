import { Routes } from '@angular/router';

export const INSIGHTS_ROUTES: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    loadComponent: () => import('./pages/overview/overview'),
  },
  {
    path: 'assessments',
    loadComponent: () => import('./pages/assessments/assessments'),
  },
  {
    path: 'mastery',
    loadComponent: () => import('./pages/mastery/mastery'),
  },
  {
    path: 'ai-insights',
    loadComponent: () => import('./pages/ai-insights/ai-insights'),
  },
];

export default INSIGHTS_ROUTES;
