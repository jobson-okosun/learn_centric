import { Routes } from '@angular/router';

export const routes: Routes = [
     { path: '', redirectTo: 'auth', pathMatch: 'full' },
     { path: 'auth', loadChildren: () => import('./auth/auth.routes') },
     {  
          path: 'app', 
          loadComponent: () => import('./layout/layout/layout'),
          children: [
               { path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.route') },   
               { 
                    path: 'teachings', 
                    children: [
                         { path: 'courses', loadChildren: () => import('./features/courses/courses.route') },   
                         { path: 'classes', loadChildren: () => import('./features/classes/classes.route') },
                         { path: 'learning-paths', loadChildren: () => import('./features/learning-paths/learning-paths.route') },
                         { path: '', redirectTo: 'courses', pathMatch: 'full' }
                    ]
               },   
               { path: 'students', loadChildren: () => import('./features/students/students.route')},
               { 
                    path: 'assessment', 
                    children: [
                         { path: 'exams-quizzes', loadChildren: () => import('./features/assessment/assessment.route') },
                         { path: 'rubrics', loadChildren: () => import('./features/rubrics/rubrics.route') },
                         { 
                              path: 'questions-bank',  
                              loadComponent: () => import('./features/question-bank/details/details'),
                              children: [
                                   { path: '', loadChildren: () => import('./features/question-bank/question-bank.routes')}
                              ]
                         },
                         { path: '', redirectTo: 'exams-quizzes', pathMatch: 'full' }
                    ]
               },
               { path: 'classroom', loadChildren: () => import('./features/classroom/classroom.route') },
               { path: 'communication', loadChildren: () => import('./features/communication/communication.route') },
               { path: 'content', loadChildren: () => import('./features/content/content.route') },
               { path: 'insights', loadChildren: () => import('./features/insights/insights.route') },
               { path: 'settings', loadChildren: () => import('./features/settings/settings.route') },
               { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
          ]
     },
     {
          path: 'learn',
          loadComponent: () => import('./layout/layout/layout'),
          children: [
               { path: '', loadChildren: () => import('./learner/learner.route') }
          ]
     },
     {
          path: 'admin',
          loadComponent: () => import('./layout/layout/layout'),
          children: [
               { path: '', loadChildren: () => import('./admin/admin.route') } 
          ]
     }
];
