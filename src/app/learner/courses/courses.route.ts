import { Routes } from '@angular/router';

const COURSES_ROUTES: Routes = [
  {
    path: '',
    children: [
      { path: '', loadComponent: () => import('./pages/list/list') },
      { 
        path: ':id',
        loadComponent: () => import('./pages/details/details'),
        children: [
          { path: '', redirectTo: 'overview', pathMatch: 'full' },
          { path: 'overview', loadComponent: () => import('./pages/overview/overview') },
          { path: 'assignments', loadComponent: () => import('./pages/assignments/assignments') },
          { path: 'discussion', loadComponent: () => import('./pages/discussion/discussion') },
          { path: 'gradebook', loadComponent: () => import('./pages/gradebook/gradebook') },
          { path: 'mastery', loadComponent: () => import('./pages/mastery/mastery') },
          { path: 'badges', loadComponent: () => import('./pages/badges/badges') },
          { path: 'pages/:pageId', loadComponent: () => import('./pages/materials/page/page') },
          { path: 'assignments/:assignmentId', loadComponent: () => import('./pages/materials/assignment/assignment') },
          {
            path: 'materials',
            children: [
              { path: 'assignments/:assignmentId', loadComponent: () => import('./pages/materials/assignment/assignment') },
              { path: 'pages/:pageId', loadComponent: () => import('./pages/materials/page/page') },
            ]
          }
        ]
      },
    ],
  },
];

export default COURSES_ROUTES;
