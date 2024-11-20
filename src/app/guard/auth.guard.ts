import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService =  inject(AuthService);
  var auth: boolean = false;

  authService.isAuthenticated().then((isAuthenticated) => {
    if (isAuthenticated) {
       router.navigate(['/welcome'])
      auth = true;
    } else {
      router.navigate(['/login']);
    }
  });

  return auth;
};
