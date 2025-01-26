import { fakeAsync, flush, TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { provideHttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { REQUEST_INVALID_CREATE_USER_JSON, REQUEST_VALID_CREATE_USER_JSON } from '../../../../tests/data/request/user/dataCreateUserFixtures';
import { environment } from '../../../environments/environment';
import { REPONSE_INVALID_ADD_USER_JSON, RESPONSE_INVALID_EXIST_USER_JSON, RESPONSE_VALID_ADD_USER_JSON, RESPONSE_VALID_EXIST_USER_JSON, RESPONSE_VALID_FIND_USER_JSON } from '../../../../tests/data/response/user/userResponseDataFixtures';
import { NOTIFICATION_INVALID_ADD_USER_JSON, NOTIFICATION_VALID_ADD_USER_JSON } from '../../../../tests/data/notification/user/userNotificationFixture';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RESPONSE_INVALID_API_JSON } from '../../../../tests/data/dataFixtures';
import { RESPONSE_EMPTY_HEADERS_JSON, RESPONSE_HEADERS_JSON } from '../../../../tests/dependencies/headers';
import { identity } from 'rxjs';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  let nzNotificationMock = jasmine.createSpyObj('NzNotificationService', ['create']);
  let routerMock = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule],
      providers: [provideHttpClient(), UserService, provideHttpClientTesting(), provideNoopAnimations(),
      {
        provide: NzNotificationService,
        useValue: nzNotificationMock
      },
      {
        provide: Router,
        useValue: routerMock
      }]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('add', () => {

    it('should call add with the correct parameters', fakeAsync(() => {
      service.add(REQUEST_VALID_CREATE_USER_JSON).then(response => {
        expect(response).toBeTrue();

        expect(nzNotificationMock.create).toHaveBeenCalledWith(
          NOTIFICATION_VALID_ADD_USER_JSON.type,
          NOTIFICATION_VALID_ADD_USER_JSON.title,
          NOTIFICATION_VALID_ADD_USER_JSON.message
        );
      });

      const request = httpMock.expectOne(req =>
        req.method === 'POST' &&
        req.url === `${environment.apiLogin}/api/user/add` &&
        req.body === REQUEST_VALID_CREATE_USER_JSON &&
        req.headers.get('Content-Type') === 'application/json' &&
        req.withCredentials === true
      );

      expect(request.request.method).toEqual('POST');
      expect(request.request.body).toEqual(REQUEST_VALID_CREATE_USER_JSON);
      expect(request.request.withCredentials).toBeTrue();

      request.flush(RESPONSE_VALID_ADD_USER_JSON);

      flush();
    }));

    it('should  call add with the incorrect parameters', fakeAsync(() => {
      service.add(REQUEST_INVALID_CREATE_USER_JSON).then(error => {
        expect(error).toBeFalse();
        expect(nzNotificationMock.create).toHaveBeenCalledWith(
          NOTIFICATION_INVALID_ADD_USER_JSON.type,
          NOTIFICATION_INVALID_ADD_USER_JSON.title,
          NOTIFICATION_INVALID_ADD_USER_JSON.message
        )
      });

      const request = httpMock.expectOne(req =>
        req.method === 'POST' &&
        req.url === `${environment.apiLogin}/api/user/add` &&
        req.body === REQUEST_INVALID_CREATE_USER_JSON &&
        req.headers.get('Content-Type') === 'application/json' &&
        req.withCredentials === true
      );

      expect(request.request.method).toEqual('POST');
      expect(request.request.body).toEqual(REQUEST_INVALID_CREATE_USER_JSON);
      expect(request.request.withCredentials).toBeTrue();

      request.flush(REPONSE_INVALID_ADD_USER_JSON);

      flush();
    }));

    it('should handle error during add', fakeAsync(() => {
      service.add(REQUEST_INVALID_CREATE_USER_JSON).then(error => {
        expect(error).toBeFalse();
        expect(nzNotificationMock.create).toHaveBeenCalledWith(
          RESPONSE_INVALID_API_JSON.type,
          RESPONSE_INVALID_API_JSON.title,
          RESPONSE_INVALID_API_JSON.message
        )
      });

      const request = httpMock.expectOne(req =>
        req.method === 'POST' &&
        req.url === `${environment.apiLogin}/api/user/add` &&
        req.body === REQUEST_INVALID_CREATE_USER_JSON &&
        req.headers.get('Content-Type') === 'application/json' &&
        req.withCredentials === true
      );

      expect(request.request.method).toEqual('POST');
      expect(request.request.body).toEqual(REQUEST_INVALID_CREATE_USER_JSON);
      expect(request.request.withCredentials).toBeTrue();

      request.flush(null, { status: 500, statusText: 'Internal Server Error' });

      flush();
    }));
  });

  describe('findUSerTokenSession', () => {
    it('should call findUSerTokenSession with the valid', fakeAsync(() => {
      service.findUserTokenSession().then(response => {
        expect(response).toEqual(RESPONSE_VALID_FIND_USER_JSON);
      })

      const request = httpMock.expectOne(req =>
        req.method === 'GET' &&
        req.url === `${environment.apiLogin}/api/user/findUserSession` &&
        req.headers.get('Content-Type') === 'application/json' &&
        req.withCredentials === true
      );

      expect(request.request.method).toEqual('GET');
      expect(request.request.headers.get('Content-Type')).toEqual('application/json');
      expect(request.request.withCredentials).toBeTrue();

      request.flush(RESPONSE_VALID_FIND_USER_JSON, { headers: RESPONSE_HEADERS_JSON });

      flush();
    }));

    it('should call findUserToken with the invalid', fakeAsync(() => {
      service.findUserTokenSession().then(response => {
        expect(response).toEqual(RESPONSE_VALID_FIND_USER_JSON);
      })

      const resquet = httpMock.expectOne(req =>
        req.method === 'GET' &&
        req.url === `${environment.apiLogin}/api/user/findUserSession` &&
        req.headers.get('Content-Type') === 'application/json' &&
        req.withCredentials === true
      );

      expect(resquet.request.method).toEqual('GET');
      expect(resquet.request.headers.get('Content-Type')).toEqual('application/json');
      expect(resquet.request.withCredentials).toBeTrue();
      resquet.flush(RESPONSE_VALID_FIND_USER_JSON, { headers: RESPONSE_EMPTY_HEADERS_JSON });

      flush();
    }));

    it('should call findUSerTokenSession with the error', fakeAsync(() => {
      service.findUserTokenSession().then(response => {
        expect(response).toBeNull();
      })

      const request = httpMock.expectOne(req =>
        req.method === 'GET' &&
        req.url === `${environment.apiLogin}/api/user/findUserSession` &&
        req.headers.get('Content-Type') === 'application/json' &&
        req.withCredentials === true
      );

      expect(request.request.method).toEqual('GET');
      expect(request.request.headers.get('Content-Type')).toEqual('application/json');
      expect(request.request.withCredentials).toBeTrue();
      request.flush(null, { status: 500, statusText: 'Internal Server Error' });

      flush();
    }))
  });

  describe('existUser', () => {
    it('should call exist with the valid', fakeAsync(() => {
      const identitfier: string = 'email';
      
      service.existUser(identitfier).then(response => {
        expect(response).toBeFalse();
        expect(response).toEqual(RESPONSE_VALID_EXIST_USER_JSON.success);
      });

      const request = httpMock.expectOne(req => 
        req.method === 'POST' &&
        req.url === `${environment.apiLogin}/api/user/exist` &&
        req.headers.get('Content-Type') === 'application/json' &&
        req.body.identifier === identitfier &&
        req.withCredentials === true
      );
      
      expect(request.request.method).toEqual('POST');
      expect(request.request.headers.get('Content-Type')).toEqual('application/json');
      expect(request.request.body.identifier).toEqual(identitfier);
      expect(request.request.withCredentials).toBeTrue();
      request.flush(RESPONSE_VALID_EXIST_USER_JSON);
    
      flush();
    }));

    it('should call exist with the invalid', fakeAsync(() => {
      const identitfier: string = '';      
      service.existUser(identitfier).then(response => {
        expect(response).toBeTrue();
        expect(response).toEqual(RESPONSE_INVALID_EXIST_USER_JSON.success);
      });

      const request = httpMock.expectOne(req => 
        req.method === 'POST' &&
        req.url === `${environment.apiLogin}/api/user/exist` &&
        req.headers.get('Content-Type') === 'application/json' &&
        req.body.identifier === identitfier &&
        req.withCredentials === true
      );
      
      expect(request.request.method).toEqual('POST');
      expect(request.request.headers.get('Content-Type')).toEqual('application/json');
      expect(request.request.body.identifier).toEqual(identitfier);
      expect(request.request.withCredentials).toBeTrue();
      request.flush(RESPONSE_INVALID_EXIST_USER_JSON);
    
      flush();
    }));

    it('should call exist with the error', fakeAsync(() => {
      const identitfier: string = 'email';
      service.existUser(identitfier).then(response => {
        expect(response).toBeFalse();
        expect(nzNotificationMock.create).toHaveBeenCalledWith(
          RESPONSE_INVALID_API_JSON.type,
          RESPONSE_INVALID_API_JSON.title,
          RESPONSE_INVALID_API_JSON.message
        )
      });

      const request = httpMock.expectOne(req =>
        req.method === 'POST' &&
        req.url === `${environment.apiLogin}/api/user/exist` &&
        req.headers.get('Content-Type') === 'application/json' &&
        req.body.identifier === identitfier &&
        req.withCredentials === true
      );

      expect(request.request.method).toEqual('POST');
      expect(request.request.headers.get('Content-Type')).toEqual('application/json');
      expect(request.request.body.identifier).toEqual(identitfier);
      expect(request.request.withCredentials).toBeTrue();
      request.flush(null, { status: 500, statusText: 'Internal Server Error' });
    
      flush();
    }));
  });

  
});
