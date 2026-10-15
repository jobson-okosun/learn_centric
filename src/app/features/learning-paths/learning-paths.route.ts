import { Routes } from '@angular/router';

const LEARNING_PATHS_ROUTES: Routes = [
    {
        path: '',
        children: [
            { path: '', loadComponent: () => import('./pages/list/list') },
            { path: 'builder/:id', loadComponent: () => import('./pages/builder/builder') }
        ]
    }
];

export default LEARNING_PATHS_ROUTES;
