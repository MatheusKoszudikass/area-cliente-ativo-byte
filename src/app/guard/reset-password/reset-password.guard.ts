import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

export const resetPasswordGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const userService = inject(UserService);

  const token = route.queryParamMap.get('token') ?? '';

  return (await userService.verifyTokenRecoveryAccount
  (token)) ? true : (router.navigate(['/login']), false); 
};
