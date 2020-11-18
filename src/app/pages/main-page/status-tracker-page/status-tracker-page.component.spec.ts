import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationExtras, Router } from '@angular/router';
import { BackButtonModule } from 'src/app/components/back-button/back-button.module';
import { StatusStepperModule } from 'src/app/components/status-stepper/status-stepper.module';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { StatusTrackerPageComponent } from './status-tracker-page.component';

describe('StatusTrackerPageComponent', () => {
  let component: StatusTrackerPageComponent;
  let fixture: ComponentFixture<StatusTrackerPageComponent>;
  let router: Router;
  let spyOnNavigate: jasmine.Spy<(
    commands: any[],
    extras?: NavigationExtras
  ) => Promise<boolean>>;

  beforeEach(async(() => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      declarations: [StatusTrackerPageComponent],
      imports: [TestSharedModule, BackButtonModule, StatusStepperModule],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusTrackerPageComponent);
    router = TestBed.inject(Router);
    spyOnNavigate = spyOn(router, 'navigate');
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to correct page', () => {
    component.onStepClick({
      label: 'Application Submitted',
      icon: 'submission',
      clickable: false,
      disabled: false,
      completed: false,
    });
    expect(spyOnNavigate).toHaveBeenCalled();
    spyOnNavigate.calls.reset();

    component.onStepClick({
      label: 'Under Review',
      icon: 'submission',
      clickable: false,
      disabled: false,
      completed: false,
    });
    expect(spyOnNavigate).toHaveBeenCalled();
    spyOnNavigate.calls.reset();

    component.onStepClick({
      label: 'Clarifications',
      icon: 'submission',
      clickable: false,
      disabled: false,
      completed: false,
    });
    expect(spyOnNavigate).toHaveBeenCalled();
    spyOnNavigate.calls.reset();

    component.onStepClick({
      label: 'Approval',
      icon: 'submission',
      clickable: false,
      disabled: false,
      completed: false,
    });
    expect(spyOnNavigate).toHaveBeenCalled();
    spyOnNavigate.calls.reset();

    component.onStepClick({
      label: 'Post Implementation',
      icon: 'submission',
      clickable: false,
      disabled: false,
      completed: false,
    });
    expect(spyOnNavigate).toHaveBeenCalled();
    spyOnNavigate.calls.reset();
  });

  it('should not update step if detail is null', () => {
    component.steps[1].completed = false;
    (component as any)._detail = null;
    (component as any)._setStepStatuses();
    expect(component.steps[1].completed).toEqual(false);
  });
});
