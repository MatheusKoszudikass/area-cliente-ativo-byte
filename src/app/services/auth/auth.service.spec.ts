import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { provideHttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NOTIFICATION_EMAIL_EMPTY_RECOVERY_JSON,
NOTIFICATION_INVALID_ACTIVE_USER_JSON, 
NOTIFICATION_INVALID_LOGIN_JSON, 
NOTIFICATION_VALID_ACTIVE_USER_JSON, 
NOTIFICATION_VALID_LOGIN_JSON, 
NOTIFICATION_VALID_LOGOUT_JSON, 
NOTIFICATION_VALID_RECOVERY_JSON } from '../../../../tests/data/notification/auth/authNotificationFixture';
import { RESPONSE_INVALID_ACTIVE_USER_JSON,
  RESPONSE_INVALID_CHECK_USER_SESSION_TOKEN_JSON,
RESPONSE_INVALID_LOGIN_JSON, 
RESPONSE_VALID_ACTIVE_USER_JSON, RESPONSE_VALID_CHECK_USER_SESSION_TOKEN_JSON, RESPONSE_VALID_LOGIN_JSON,
} from '../../../../tests/data/response/auth/authResponseDataFixtures';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RESPONSE_INVALID_API_JSON } from '../../../../tests/data/dataFixtures';
import { REQUEST_CREATE_LOGIN_INVALID_JSON,
REQUEST_CREATE_LOGIN_JSON, 
REQUEST_CREATE_LOGIN_VALID_JSON } from '../../../../tests/data/request/login/dataCreateLoginFixtures';
import { Router } from '@angular/router';
import { RESPONSE_EMPTY_HEADERS_JSON, 
RESPONSE_HEADERS_JSON,
RESPONSE_HEADERS_TOKEN_SESSION_JSON } from '../../../../tests/dependencies/headers';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let notificationMock = jasmine.createSpyObj('NzNotificationService', ['create']);
  let routerMock = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule, NoopAnimationsModule],
      providers: [provideHttpClient(), AuthService, provideHttpClientTesting(), {
        provide: NzNotificationService,
        useValue: notificationMock
      },
      {
        provide: Router,
        useValue: routerMock
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
    
    it('should show warning if email is not provided', fakeAsync(() => {
      service.recoveryAccount(REQUEST_CREATE_LOGIN_JSON).then(response => {
        expect(response).toBeNull();
        expect(notificationMock.create).toHaveBeenCalledWith(
          NOTIFICATION_EMAIL_EMPTY_RECOVERY_JSON.type,
          NOTIFICATION_EMAIL_EMPTY_RECOVERY_JSON.title,
          NOTIFICATION_EMAIL_EMPTY_RECOVERY_JSON.message
        );
      });
    }));

    it('should initiate account recovery with valid login details', fakeAsync(() => {
      service.recoveryAccount(REQUEST_CREATE_LOGIN_VALID_JSON).then(response => {
        expect(response).toBeNull();
        expect(notificationMock.create).toHaveBeenCalledWith(
          NOTIFICATION_VALID_RECOVERY_JSON.type,
          NOTIFICATION_VALID_RECOVERY_JSON.title,
          NOTIFICATION_VALID_RECOVERY_JSON.message
        );
      });

      const request = httpMock.expectOne(req =>
        req.method === 'POST' &&
        req.url === `${environment.apiLogin}/api/auth/recovery-account` &&
        req.body === REQUEST_CREATE_LOGIN_VALID_JSON &&
        req.headers.get('Content-Type') === 'application/json' &&
        req.withCredentials === true
      );
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toBe(REQUEST_CREATE_LOGIN_VALID_JSON);
      expect(request.request.headers.get('Content-Type')).toBe('application/json');
      expect(request.request.withCredentials).toBeTrue();
      expect(request.request.headers.get('Set-Cookie')).toBeNull();
      flush();
    }));

    it('should handle error during account recovery', fakeAsync(() => {
      service.recoveryAccount(REQUEST_CREATE_LOGIN_VALID_JSON).then(error => {
        expect(error).toBeNull();
        expect(notificationMock.create).toHaveBeenCalledWith(
          RESPONSE_INVALID_API_JSON.type,
          RESPONSE_INVALID_API_JSON.title,
          RESPONSE_INVALID_API_JSON.message
        );
      });

      const request = httpMock.expectOne(req =>
        req.method === 'POST' &&
        req.url === `${environment.apiLogin}/api/auth/recovery-account` &&
        req.body === REQUEST_CREATE_LOGIN_VALID_JSON &&
        req.headers.get('Content-Type') === 'application/json' &&
        req.withCredentials === true
      );
      expect(request.request.method).toBe('POST');
      expect(request.request.body).toBe(REQUEST_CREATE_LOGIN_VALID_JSON);
      request.flush(null, { status: 500, statusText: 'Internal Server Error' });
    }));
  });

  describe('login', () => {
    it('should authenticate user with valid credentials', fakeAsync(() => {
      service.login(REQUEST_CREATE_LOGIN_VALID_JSON).then(response => {
        expect(response).toBeUndefined();
        expect(notificationMock.create).toHaveBeenCalledWith(
          NOTIFICATION_VALID_LOGIN_JSON.type,
          NOTIFICATION_VALID_LOGIN_JSON.title,
          NOTIFICATION_VALID_LOGIN_JSON.message
        );
      });

      const request = httpMock.expectOne(req =>
        req.method === 'POST' &&
        req.url === `${environment.apiLogin}/api/auth/login` &&
        req.body === REQUEST_CREATE_LOGIN_VALID_JSON &&
        req.headers.get('Content-Type') === 'application/json' &&
        req.withCredentials === true
      );

      expect(request.request.method).toBe('POST');
      expect(request.request.body).toBe(REQUEST_CREATE_LOGIN_VALID_JSON);
      expect(request.request.headers.get('Content-Type')).toBe('application/json');
      expect(request.request.withCredentials).toBeTrue();
      request.flush(RESPONSE_VALID_LOGIN_JSON, { headers: RESPONSE_HEADERS_TOKEN_SESSION_JSON });
      flush();
    }));

    it('should authenticate user with invalid credentials', fakeAsync(() => {
      service.login(REQUEST_CREATE_LOGIN_INVALID_JSON).then(response => {
        expect(response).toBeUndefined();
        expect(notificationMock.create).toHaveBeenCalledWith(
          NOTIFICATION_INVALID_LOGIN_JSON.type,
          NOTIFICATION_INVALID_LOGIN_JSON.title,
          NOTIFICATION_INVALID_LOGIN_JSON.message
        );
      });

      const request = httpMock.expectOne(req => 
        req.method === 'POST' &&
        req.url === `${environment.apiLogin}/api/auth/login` &&
        req.body === REQUEST_CREATE_LOGIN_INVALID_JSON &&
        req.headers.get('Content-Type') === 'application/json' &&
        req.withCredentials === true
      );

      expect(request.request.method).toBe('POST');
      expect(request.request.body).toBe(REQUEST_CREATE_LOGIN_INVALID_JSON);
      expect(request.request.headers.get('Content-Type')).toBe('application/json');
      expect(request.request.withCredentials).toBeTrue();
      request.flush(RESPONSE_INVALID_LOGIN_JSON);
      flush();
     }));

    it('should handle error during login', fakeAsync(() => {
      service.login(REQUEST_CREATE_LOGIN_INVALID_JSON).then(error => {
        expect(error).toBeUndefined();
        expect(notificationMock.create).toHaveBeenCalledWith(
          RESPONSE_INVALID_API_JSON.type,
          RESPONSE_INVALID_API_JSON.title,
          RESPONSE_INVALID_API_JSON.message
        );
      });

      const request = httpMock.expectOne(req => 
        req.method === 'POST' &&
        req.url === `${environment.apiLogin}/api/auth/login` &&
        req.body === REQUEST_CREATE_LOGIN_INVALID_JSON &&
        req.headers.get('Content-Type') === 'application/json' &&
        req.withCredentials === true
      );

      expect(request.request.method).toBe('POST');
      expect(request.request.body).toBe(REQUEST_CREATE_LOGIN_INVALID_JSON);
      expect(request.request.headers.get('Content-Type')).toBe('application/json');
      expect(request.request.withCredentials).toBeTrue();
      request.flush(null, { status: 500, statusText: 'Internal Server Error' });
      flush();
    }));
  });

  describe('isCheckUserSessionToken', () => {
    it('should verify if token is valid', fakeAsync(() => {
      service.isCheckUserSessionToken().then(response => {
        expect(response).toBeTrue();
      });

      const request = httpMock.expectOne(req =>
        req.method === 'GET' &&
        req.url === `${environment.apiLogin}/api/auth/verify` &&
        req.headers.get('Content-Type') === 'application/json' &&
        req.withCredentials === true
      );
      expect(request.request.method).toBe('GET');
      expect(request.request.headers.get('Content-Type')).toBe('application/json');
      expect(request.request.withCredentials).toBeTrue();
      request.flush(RESPONSE_VALID_CHECK_USER_SESSION_TOKEN_JSON, {headers: RESPONSE_HEADERS_JSON});
      flush();
    }));

    it('should verify if token is invalid', fakeAsync(() => {
      service.isCheckUserSessionToken().then(response => {
        expect(response).toBeFalse();
      });

      const request = httpMock.expectOne(req =>
        req.method === 'GET' &&
        req.url === `${environment.apiLogin}/api/auth/verify` &&
        req.headers.get('Content-Type') === 'application/json' &&
        req.withCredentials === true
      );
      expect(request.request.method).toBe('GET');
      expect(request.request.headers.get('Content-Type')).toBe('application/json');
      expect(request.request.withCredentials).toBeTrue();
      request.flush(RESPONSE_INVALID_CHECK_USER_SESSION_TOKEN_JSON, {headers: RESPONSE_HEADERS_JSON});
      flush();
    }));

    it('should handle error during token verification', fakeAsync(() => {
      service.isCheckUserSessionToken().then(error => {
        expect(error).toBeFalse();
        expect(notificationMock.create).toHaveBeenCalledWith(
          RESPONSE_INVALID_API_JSON.type,
          RESPONSE_INVALID_API_JSON.title,
          RESPONSE_INVALID_API_JSON.message
        );
      });

      const request = httpMock.expectOne(req =>
        req.method === 'GET' &&
        req.url === `${environment.apiLogin}/api/auth/verify` &&
        req.headers.get('Content-Type') === 'application/json' &&
        req.withCredentials === true
      );
      expect(request.request.method).toBe('GET');
      expect(request.request.headers.get('Content-Type')).toBe('application/json');
      expect(request.request.withCredentials).toBeTrue();
      request.flush(null, { status: 500, statusText: 'Internal Server Error' });
      flush();
    }));
  });

  describe('logout', () => {
    it('should logout user successfully', fakeAsync(() => {
       service.logout().then(response => {
         expect(response).toBeUndefined();
         expect(notificationMock.create).toHaveBeenCalledWith(
          NOTIFICATION_VALID_LOGOUT_JSON.type,
          NOTIFICATION_VALID_LOGOUT_JSON.title,
          NOTIFICATION_VALID_LOGOUT_JSON.message
         );
       });

       const request = httpMock.expectOne(req =>
        req.method === 'GET' &&
        req.url === `${environment.apiLogin}/api/auth/logout` &&
        req.headers.get('Content-Type') === 'application/json' &&
        req.withCredentials === true
      );
      expect(request.request.method).toBe('GET');
      expect(request.request.headers.get('Content-Type')).toBe('application/json');
      expect(request.request.withCredentials).toBeTrue();
      request.flush({headers: RESPONSE_EMPTY_HEADERS_JSON});
      flush();
    }));

    it('should handle error during logout', fakeAsync(() => {
       service.logout().then(error => {
         expect(error).toBeUndefined();
         expect(notificationMock.create).toHaveBeenCalledWith(
          RESPONSE_INVALID_API_JSON.type,
          RESPONSE_INVALID_API_JSON.title,
          RESPONSE_INVALID_API_JSON.message
         );
       });

       const request = httpMock.expectOne(req =>
        req.method === 'GET' &&
        req.url === `${environment.apiLogin}/api/auth/logout` &&
        req.headers.get('Content-Type') === 'application/json' &&
        req.withCredentials === true
      );
      expect(request.request.method).toBe('GET');
      expect(request.request.headers.get('Content-Type')).toBe('application/json');
      expect(request.request.withCredentials).toBeTrue();
      request.flush(null, { status: 500, statusText: 'Internal Server Error' });
      flush();
    }));
  });
});
