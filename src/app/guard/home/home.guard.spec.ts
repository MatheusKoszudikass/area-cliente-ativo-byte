import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { homeGuard } from './home.guard';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';

describe('homeGuard', () => {
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let routerMock: jasmine.SpyObj<Router>;
  
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => homeGuard(...guardParameters));

  beforeEach(() => {
    authServiceMock = jasmine.createSpyObj<AuthService>('AuthService', ['isCheckUserSessionToken']);
    routerMock = jasmine.createSpyObj<Router>('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [ 
        { 
          provide: AuthService, 
          useValue: authServiceMock 

        }, 
        { 
          provide: Router,
          useValue: routerMock 
        }]
    });
  });

  it('should redirect to /home if the user is authenticated', async () => {
    authServiceMock.isCheckUserSessionToken.and.resolveTo(true);
    const route: ActivatedRouteSnapshot = {} as any;
    const state: RouterStateSnapshot = {url: '/'} as any;
    routerMock.navigate.and.resolveTo(true);
    const result = await executeGuard(route, state) as boolean;
    
    expect(result).toBeTrue();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should redirect to login if the user is not authenticated', async () => {
    authServiceMock.isCheckUserSessionToken.and.resolveTo(false);
    const route: ActivatedRouteSnapshot = {} as any;
    const state: RouterStateSnapshot = {url: '/'} as any;
    routerMock.navigate.and.resolveTo(false);
    const result = await executeGuard(route, state) as boolean;
    
    expect(result).toBeFalse();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });
});
