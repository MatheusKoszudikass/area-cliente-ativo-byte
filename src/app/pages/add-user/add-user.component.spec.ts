import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUserComponent } from './add-user.component';
import { provideHttpClient } from '@angular/common/http';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';
import { provideNgxMask } from 'ngx-mask';
import { RoleService } from '../../services/role/role.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IconDefinition } from '@ant-design/icons-angular';
import {ComponentFixtureAutoDetect} from '@angular/core/testing';

// Import what you need. RECOMMENDED. ✔️
import { AccountBookFill, AlertFill, AlertOutline, QuestionOutline } from '@ant-design/icons-angular/icons';
import { RouterModule } from '@angular/router';
const icons: IconDefinition[] = [AccountBookFill, AlertOutline, AlertFill];

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUserComponent, RouterModule.forRoot([]), NoopAnimationsModule],
      providers: [provideNgxMask(),
         RoleService,
         provideHttpClient(),
         provideNzIconsTesting(),
        {
          provide: ComponentFixtureAutoDetect, useValue: true
        }],
    }).compileComponents();

    fixture = TestBed.createComponent(AddUserComponent);  
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1.textContent).toContain('Cadastrar usuário');
    expect(component).toBeTruthy();
  });
});
