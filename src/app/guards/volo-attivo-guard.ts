import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../servizi/auth/auth';

export const voloAttivoGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.voloAttivo()) {
    const voloId = authService.voloAttivo()!; // non null
    return router.createUrlTree(['/voli/chiusura', voloId]);
  }

  return true;
};
