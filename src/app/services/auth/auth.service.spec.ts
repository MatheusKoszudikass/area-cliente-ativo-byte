import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { provideHttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NOTIFICATION_INVALID_ACTIVE_USER_JSON, NOTIFICATION_VALID_ACTIVE_USER_JSON } from '../../../../tests/data/notification/auth/authNotificationFixture';
import { RESPONSE_INVALID_ACTIVE_USER_JSON, RESPONSE_VALID_ACTIVE_USER_JSON } from '../../../../tests/data/response/auth/authResponseDataFixtures';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RESPONSE_INVALID_API_JSON } from '../../../../tests/data/dataFixtures';


describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let notificationMock = jasmine.createSpyObj('NzNotificationService', ['create']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule, NoopAnimationsModule],
      providers: [provideHttpClient(), AuthService, provideHttpClientTesting(), {
        provide: NzNotificationService,
        useValue: notificationMock
      }],
    });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthService);
  });

  describe('activeUser', () => {
    it('should activate user with invalid token', fakeAsync(() => {
      service.activeUser('invalidToken').then(response => {
        expect(response).toBeUndefined();
        expect(notificationMock.create).toHaveBeenCalledWith(
          NOTIFICATION_INVALID_ACTIVE_USER_JSON.type,
          NOTIFICATION_INVALID_ACTIVE_USER_JSON.title,
          NOTIFICATION_INVALID_ACTIVE_USER_JSON.message
        );
      });

      const request = httpMock.expectOne(req =>
        req.url === `${environment.apiLogin}/api/user/twoFactorAuth` &&
        req.params.get('token') === 'invalidToken' &&
        req.params.set('token', 'validToken') &&
        req.headers.get('Content-Type') === 'application/json' &&
        req.withCredentials === true
      );

      expect(request.request.method).toBe('POST');
      expect(request.request.body).toBeNull();
      expect(request.request.headers.get('Content-Type')).toBe('application/json');
      expect(request.request.headers.get)
      expect(request.request.withCredentials).toBeTrue();
      expect(request.request.headers.get('Set-Cookie')).toBeNull();

      request.flush(RESPONSE_INVALID_ACTIVE_USER_JSON);
      
      flush();
    }));

    it('should activate user with valid token', fakeAsync(() => {
      service.activeUser('validToken').then(() => {
        expect(notificationMock.create).toHaveBeenCalledWith(
          NOTIFICATION_VALID_ACTIVE_USER_JSON.type,
          NOTIFICATION_VALID_ACTIVE_USER_JSON.title,
          NOTIFICATION_VALID_ACTIVE_USER_JSON.message
        );
      });
  
      const request = httpMock.expectOne(req =>
        req.method === 'POST' &&
        req.url === `${environment.apiLogin}/api/user/twoFactorAuth` &&
        req.params.get('token') === 'validToken' &&
        req.headers.get('Content-Type') === 'application/json' &&
        req.withCredentials === true
      );
  
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toBeNull();
      expect(request.request.headers.get('Content-Type')).toBe('application/json');
      expect(request.request.withCredentials).toBeTrue();
  
      request.flush(RESPONSE_VALID_ACTIVE_USER_JSON);

      flush();
    }));

    it('should handle error during user activation', fakeAsync(() => {
      service.activeUser('validToken').catch((error) => {
        expect(error).toBeTruthy();
        expect(notificationMock.create).toHaveBeenCalledWith(

        )
      });
  
      const request = httpMock.expectOne(req =>
        req.method === 'POST' &&
        req.url === `${environment.apiLogin}/api/user/twoFactorAuth` &&
        req.params.get('token') === 'validToken' &&
        req.headers.get('Content-Type') === 'application/json' &&
        req.withCredentials === true
      );
  
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toBeNull();
      expect(request.request.headers.get('Content-Type')).toBe('application/json');
      expect(request.request.withCredentials).toBeTrue();
  
      request.flush(
        RESPONSE_INVALID_API_JSON.type
      );
    }));
  });

  describe('recoveryAccount', () => {
    it('should initiate account recovery with valid login details', async () => {
      // Test implementation for recoveryAccount method
    });

    it('should handle error during account recovery', async () => {
      // Test implementation for error handling in recoveryAccount method
    });

    it('should show warning if email is not provided', async () => {
      // Test implementation for email validation in recoveryAccount method
    });
  });

  describe('login', () => {
    it('should authenticate user with valid credentials', async () => {
      // Test implementation for login method
    });

    it('should handle error during login', async () => {
      // Test implementation for error handling in login method
    });
  });

  describe('isVerifyToken', () => {
    it('should verify if token is valid', async () => {
      // Test implementation for isVerifyToken method
    });

    it('should handle error during token verification', async () => {
      // Test implementation for error handling in isVerifyToken method
    });
  });

  describe('findUser', () => {
    it('should find user successfully', async () => {
      // Test implementation for findUser method
    });

    it('should handle error during user finding', async () => {
      // Test implementation for error handling in findUser method
    });
  });

  describe('logout', () => {
    it('should logout user successfully', async () => {
      // Test implementation for logout method
    });

    it('should handle error during logout', async () => {
      // Test implementation for error handling in logout method
    });
  });

  describe('isAuthenticated', () => {
    it('should return true if user is authenticated', async () => {
      // Test implementation for isAuthenticated method
    });

    it('should return false if user is not authenticated', async () => {
      // Test implementation for isAuthenticated method
    });
  });
});
