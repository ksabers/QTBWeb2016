import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { Chiusura } from './pagine/voli/chiusura/chiusura';
import { authGuard } from './guards/auth-guard';
import { voloAttivoGuard } from './guards/volo-attivo-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login').then(m => m.Login)
  },
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pagine/dashboard/dashboard').then(m => m.Dashboard),
        canActivate: [voloAttivoGuard]
      },

      {
        path: 'voli/chiusura/:id',
        loadComponent: () => import('./pagine/voli/chiusura/chiusura').then(m => m.Chiusura)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
