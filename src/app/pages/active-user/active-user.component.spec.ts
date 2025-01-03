import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActiveUserComponent } from './active-user.component';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('ActiveUserComponent', () => {
  let component: ActiveUserComponent;
  let fixture: ComponentFixture<ActiveUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveUserComponent, RouterModule.forRoot([])],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

