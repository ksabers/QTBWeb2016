import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';
import { authGuard } from './auth/auth-guard';
import { voloAttivoGuard } from './auth/volo-attivo-guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./auth/login/login').then(m => m.Login) },
  
  {
    path: '',
    component: MainLayout,
    children: [
      // 1. Root empty → auth check → dashboard
      { 
        path: '', 
        canActivate: [authGuard],
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
      },
      
      // 2. Dashboard con volo check
      { 
        path: 'dashboard', 
        loadComponent: () => import('./pagine/dashboard/dashboard').then(m => m.Dashboard),
        canActivate: [voloAttivoGuard]
      },
      
      // 3. Chiusura volo: NO guard (sempre accessibile post-login)
      { 
        path: 'voli/chiusura/:id',
        loadComponent: () => import('./pagine/voli/chiusura/chiusura').then(m => m.Chiusura)
      }
    ]
  },
  
  { path: '**', redirectTo: 'login' }
];
