import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginAccessTabRouterModule } from 'src/app/components/login-access-tab-router/login-access-tab-router.module';
import { RectCardModule } from 'src/app/components/rect-card/rect-card.module';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { LoginAccessPageComponent } from './login-access-page.component';

describe('LoginAccessPageComponent', () => {
  let component: LoginAccessPageComponent;
  let fixture: ComponentFixture<LoginAccessPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginAccessPageComponent],
      imports: [TestSharedModule, RectCardModule, LoginAccessTabRouterModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAccessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
