import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { provideHttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule],
      providers: [provideHttpClient(), AuthService]
    });
    service = TestBed.inject(AuthService);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
