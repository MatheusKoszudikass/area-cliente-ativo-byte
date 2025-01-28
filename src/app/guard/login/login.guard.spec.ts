import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { loginGuard } from './login.guard';
import { AuthService } from '../../services/auth/auth.service';

describe('loginGuard', () => {
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let routerMock: jasmine.SpyObj<Router>;

  const executeGuard: CanActivateFn = (...guardParameters) => 
    TestBed.runInInjectionContext(() => loginGuard(...guardParameters));

  beforeEach(() => {
    authServiceMock =  jasmine.createSpyObj<AuthService>('AuthService', ['isCheckUserSessionToken']);
    routerMock =  jasmine.createSpyObj<Router>('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });

  });

  it('should redirect to /home if the user is authenticated', async () => {
    authServiceMock.isCheckUserSessionToken.and.resolveTo(true);
    const route: ActivatedRouteSnapshot = {} as any;
    const state: RouterStateSnapshot = { url: '/' } as any;

    routerMock.navigate.and.resolveTo(true);
     
    const result = await executeGuard(route, state);

    expect(result).toBe(true);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should allow access if the user is not authenticated', async () => {
    authServiceMock.isCheckUserSessionToken.and.resolveTo(false);
    const route: ActivatedRouteSnapshot = {} as any;
    const state: RouterStateSnapshot = { url: '/' } as any;

    const result = await executeGuard(route, state);

    expect(result).toBe(false);
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});
