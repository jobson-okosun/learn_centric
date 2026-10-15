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
          { path: '', loadComponent: () => import('./pages/overview/overview') },
          { path: 'members', loadComponent: () => import('./pages/members/members') },
          { path: 'groups', loadComponent: () => import('./pages/groups/groups') },
          { path: 'gradebook', loadComponent: () => import('./pages/gradebook/gradebook') },
          { path: 'discussion', loadComponent: () => import('./pages/discussion/discussion') },
          { path: 'mastery', loadComponent: () => import('./pages/mastery/mastery') },
          { path: 'badges', loadComponent: () => import('./pages/badges/badges') },
          { path: 'settings', loadComponent: () => import('./pages/settings/settings') },
          { 
            path: 'materials',
            children: [
              { path: 'assignments/:assignmentId', loadComponent: () => import('./pages/materials/assignment/assignment') },
              { path: 'quizzes/:quizId', loadComponent: () => import('./pages/materials/quiz/quiz') },
              { path: 'pages/:pageId', loadComponent: () => import('./pages/materials/page/page') },
              { path: 'discussions/:discussionId', loadComponent: () => import('./pages/materials/discussion/discussion') },
              { path: 'mastery/:materialId', loadComponent: () => import('./pages/materials/mastery/mastery') },
            ]
          }
        ]
       },
    ],
  },
];

export default COURSES_ROUTES