import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';

const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: Dashboard,
        title: 'Dashboard',
      },
    ],
  },
];

export default DASHBOARD_ROUTES

