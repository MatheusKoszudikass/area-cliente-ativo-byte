import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

/**
 * Guarda de rota que verifica se o usuário está autenticado.
 * Caso esteja, redireciona para a página inicial e bloqueia a navegação.
 * Caso contrário, permite a navegação.
 * @param route Rota que está sendo acessada.
 * @param state Estado da navegação.
 */
export const loginGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return await authService.isCheckUserSessionToken() ? (router.navigate(['/home'])) 
  : false;
};