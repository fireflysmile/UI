import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { of } from 'rxjs';
import { SubscriptionService } from 'src/app/services/subscription/subscription.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { ViewToggleComponent } from './view-toggle.component';

describe('ViewToggleComponent', () => {
  let component: ViewToggleComponent;
  let fixture: ComponentFixture<ViewToggleComponent>;
  let router: Router;
  let subscriptionService: SubscriptionService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewToggleComponent],
      imports: [TestSharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewToggleComponent);
    router = TestBed.inject(Router);
    subscriptionService = TestBed.inject(SubscriptionService);
    spyOn(subscriptionService, 'ngOnDestroy');
    spyOn(subscriptionService, 'store');
    spyOn(subscriptionService, 'append');
    spyOn(subscriptionService, 'unSubscribeAll');
    spyOn(subscriptionService, 'unSubscribe');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update button styles', fakeAsync(() => {
    (router as any).events = of(null);
    component.ngOnInit();

    component.routes = [
      {
        label: 'label',
        route: 'route',
      },
      {
        label: 'label',
        route: 'route2',
      },
    ];
    fixture.detectChanges();
    spyOn(
      component.buttonRefs.first.nativeElement.classList,
      'contains'
    ).and.returnValue(true);
    (router as any).events = of(new NavigationEnd(0, '', ''));
    component.ngOnInit();
    tick();
    component.ngOnDestroy();

    expect(component.buttonRefs.first.nativeElement.style.left).toEqual('');
  }));
});
