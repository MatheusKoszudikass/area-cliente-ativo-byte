import { fakeAsync, TestBed } from '@angular/core/testing';

import { RoleService } from './role.service';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { RESPONSE_VALID_FIND_ROLE_JSON } from '../../../../tests/data/response/roleReponseDataFixtures';
import { RESPONSE_INVALID_API_JSON } from '../../../../tests/data/dataFixtures';

describe('RoleService', () => {
  let service: RoleService;
  let httpMock: HttpTestingController;
  let notificationMock = jasmine.createSpyObj('NzNotificationService', ['create']);

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [BrowserModule],
        providers: [provideHttpClient(), RoleService, provideHttpClientTesting(), {
          provide: NzNotificationService,
          useValue: notificationMock
        }],
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(RoleService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('findRolesAll', () => {
    it('Should return all data related to role with success', fakeAsync(() => {
      service.findRolesAll().then((data) => {
        expect(data).toBe(RESPONSE_VALID_FIND_ROLE_JSON);
      });

      const req = httpMock.expectOne(`${service.apiUrl}/api/role/findAll`);
      expect(req.request.method).toBe('GET');
      req.flush(RESPONSE_VALID_FIND_ROLE_JSON);
    }));
    
    it('Should return all data related to role with error', fakeAsync(() => {
      service.findRolesAll().then((data) => {
        expect(data).toBeNull();
        expect(notificationMock.create).toHaveBeenCalledWith(
          RESPONSE_INVALID_API_JSON.type,
          RESPONSE_INVALID_API_JSON.title,
          RESPONSE_INVALID_API_JSON.message
        )
      });

      const req = httpMock.expectOne(`${service.apiUrl}/api/role/findAll`);
      expect(req.request.method).toBe('GET');
      req.flush(null, { status: 500, statusText: 'Internal Server Error' });
    }))
  });
});
