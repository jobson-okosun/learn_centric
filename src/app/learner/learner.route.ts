import { Routes } from '@angular/router';

const LEARNER_ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { 
    path: 'home', 
    loadComponent: () => import('./pages/home/home'),
  },
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.route'),
  },
  {
    path: 'classroom',
    loadChildren: () => import('./classroom/classroom.route'),
  },
  {
    path: 'classes',
    redirectTo: 'classroom/classes',
    pathMatch: 'prefix',
  },
  {
    path: 'practice',
    loadChildren: () => import('./practice/practice.route'),
  },
  {
    path: 'assessments',
    loadChildren: () => import('./assessments/assessments.route'),
  },
];

export default LEARNER_ROUTES;
