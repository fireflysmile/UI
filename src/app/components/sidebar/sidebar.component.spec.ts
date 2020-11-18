import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { SidebarNavItemModule } from '../sidebar-nav-item/sidebar-nav-item.module';
import { AppService } from 'src/app/services/components/app.service';
import { UserInfoItem } from 'src/app/models/user-info-item';
import { NavigationEnd, Router } from '@angular/router';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let appService: AppService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      imports: [TestSharedModule, SidebarNavItemModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    appService = TestBed.inject(AppService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set correct navigation by role', () => {
    const spyOnNavigate = spyOn(router, 'navigate');
    let userInfo: UserInfoItem = {
      role: 'Tester',
    };
    appService.userInfo = userInfo;
    expect(component.navigations.length).toEqual(8);

    userInfo = {
      role: 'HO',
    };
    appService.userInfo = userInfo;
    expect(component.navigations.length).toEqual(3);
    expect(component.navigations[1].notifications()).toEqual(0);

    userInfo = {
      role: 'RO',
    };
    appService.userInfo = userInfo;
    expect(component.navigations.length).toEqual(3);

    userInfo = {
      role: 'TM',
    };
    appService.userInfo = userInfo;
    expect(component.navigations.length).toEqual(5);

    userInfo = {
      role: 'Member',
    };
    appService.userInfo = userInfo;
    expect(component.navigations.length).toEqual(4);

    userInfo = {
      role: 'Member Admin',
    };
    appService.userInfo = userInfo;
    expect(component.navigations.length).toEqual(4);
    component.navigations[3].onClick();
    expect(spyOnNavigate).toHaveBeenCalled();
    spyOnNavigate.calls.reset();

    userInfo = {
      role: 'LCN Admin',
    };
    appService.userInfo = userInfo;
    expect(component.navigations.length).toEqual(5);
    component.navigations[4].onClick();
    expect(spyOnNavigate).toHaveBeenCalled();
    spyOnNavigate.calls.reset();

    userInfo = {
      role: 'LCN Super Admin',
    };
    appService.userInfo = userInfo;
    expect(component.navigations.length).toEqual(5);

    userInfo = {
      role: 'Oloc',
    };
    appService.userInfo = userInfo;
    expect(component.navigations.length).toEqual(2);
    expect(component.navigations[1].notifications()).toEqual(0);

    const spyOnRouter = spyOnProperty(router, 'url').and.returnValue(
      'application-review'
    );
    userInfo = {
      role: 'RO',
    };
    (component as any)._user = null;
    (component as any)._setNavigationsByRoles();
    // should not update navigations if user is null
    expect(component.navigations.length).toEqual(2);
    appService.userInfo = userInfo;
    const spyOnSubscribe = spyOn(
      router.events,
      'subscribe'
    ).and.callFake((cb) => cb(new NavigationEnd(0, '', '')));
    component.ngOnInit();
    expect(component.navigations.length).toEqual(10);
    spyOnSubscribe.and.callFake((cb) => cb(null));
    component.ngOnInit();
    expect(component.navigations.length).toEqual(10);

    spyOnRouter.and.returnValue('main/trade');
    userInfo = {
      role: 'Member Admin',
    };
    appService.userInfo = userInfo;
    expect(component.navigations.length).toEqual(5);

    userInfo = {
      role: 'LCN Admin',
    };
    appService.userInfo = userInfo;
    expect(component.navigations.length).toEqual(5);
  });
});
