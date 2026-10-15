import { Routes } from '@angular/router';

const COMMUNICATION_ROUTES: Routes = [
    {
        path: '',
        children: [
            { path: 'inbox', loadComponent: () => import('./pages/inbox/inbox') },
            { path: 'announcements', loadComponent: () => import('./pages/announcements/announcements') },
            { path: 'groups', loadComponent: () => import('./pages/groups/groups') },
            { path: '', redirectTo: 'inbox', pathMatch: 'full' }
        ] 
    }
];

export default COMMUNICATION_ROUTES;
