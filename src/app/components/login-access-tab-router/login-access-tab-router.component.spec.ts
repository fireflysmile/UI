import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { TabRouterModule } from '../tab-router/tab-router.module';

import { LoginAccessTabRouterComponent } from './login-access-tab-router.component';

describe('LoginAccessTabRouterComponent', () => {
  let component: LoginAccessTabRouterComponent;
  let fixture: ComponentFixture<LoginAccessTabRouterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginAccessTabRouterComponent],
      imports: [TestSharedModule, TabRouterModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginAccessTabRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
