import { Routes } from '@angular/router';

const DISCUSSIONS_ROUTES: Routes = [
  {
    path: '',
    children: [
      { path: 'discussions', loadComponent: () => import('./pages/forum/forum') },
      { path: 'forum', redirectTo: 'discussions', pathMatch: 'full' },
      { path: 'announcements', loadComponent: () => import('./pages/announcements/announcements') },
      { path: 'messages', loadComponent: () => import('./pages/messages/messages') },
      { path: '', redirectTo: 'discussions', pathMatch: 'full' },
    ],
  },
];

export default DISCUSSIONS_ROUTES;
