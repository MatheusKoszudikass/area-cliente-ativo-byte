import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';


/**
 * Route guard that checks if the user is authenticated.
 * If authenticated, navigation is allowed.
 * If not, the user is redirected to the login page and navigation is blocked.
 * 
 * @param route - The route that is being accessed.
 * @param state - The state of the router.
 * @returns A Promise that resolves to true if the user is authenticated, 
 *          otherwise resolves to false after redirecting to login.
 */

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (await authService.isCheckUserSessionToken() === true) {
      return true;
  } else {
    router.navigate(['/login']);
    return false; // Bloqueia a navegação
  }
};
