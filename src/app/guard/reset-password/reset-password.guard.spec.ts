import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { resetPasswordGuard } from './reset-password.guard';
import { UserService } from '../../services/user/user.service';

describe('resetPasswordGuard', () => {
  let userServiceMock: jasmine.SpyObj<UserService>;
  let routerMock: jasmine.SpyObj<Router>;

  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => resetPasswordGuard(...guardParameters));

  beforeEach(() => {
     userServiceMock = jasmine.createSpyObj<UserService>('UserService', ['verifyTokenRecoveryAccount']);
     routerMock = jasmine.createSpyObj<Router>('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [{
        provide: UserService,
        useValue: userServiceMock
      },
      {
        provide: Router,
        useValue: routerMock
      }]
    });
  });

  it('should redirect to login if the user is not authenticated', async () => {
    userServiceMock.verifyTokenRecoveryAccount.and.resolveTo(false);
    const route: ActivatedRouteSnapshot = {
      queryParamMap: {
        get: (key: string) => key === 'token'  ? '' : null
      }
    } as any;
    const state: RouterStateSnapshot = {url: '/' } as any;
    routerMock.navigate.and.resolveTo(false);

    const result = await executeGuard(route ?? {queryParamMap: {get: () => ''}}, state) as boolean;

    expect(result).toBeFalse();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should allow access if the user is authenticated', async () => {
    userServiceMock.verifyTokenRecoveryAccount.and.resolveTo(true);
    const route: ActivatedRouteSnapshot = {
      queryParamMap: {
        get: (key: string) => key === 'token' ? '' : null
      }
    } as any;
    const state: RouterStateSnapshot = {url: '/' } as any;
    routerMock.navigate.and.resolveTo(true);

    const result = await executeGuard(route, state) as boolean;

    expect(result).toBeTrue();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
  
});
