import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';
import { ResetPasswordComponent } from './reset-password.component';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { UserService } from '../../services/user/user.service';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPasswordComponent, RouterModule.forRoot([])],
      providers: [provideHttpClient(), UserService, provideNzIconsTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
