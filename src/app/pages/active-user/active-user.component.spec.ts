import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActiveUserComponent } from './active-user.component';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

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

  describe('ActiveUserComponent', () => {
    it('should ngOnInit', () => {
      const bannerElement: HTMLElement = fixture.nativeElement;
      const bannerDe: DebugElement = fixture.debugElement;
      const p = bannerElement.querySelectorAll('p')!;
      expect(p[0].textContent).toEqual('Validando seus dados');
      expect(p[1].textContent).toEqual('Aguarde...');
      expect(component).toBeDefined();
    });
  });
});

