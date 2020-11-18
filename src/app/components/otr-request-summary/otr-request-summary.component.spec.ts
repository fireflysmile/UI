import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { RectCardModule } from '../rect-card/rect-card.module';

import { OtrRequestSummaryComponent } from './otr-request-summary.component';
import { OtrRequestSummaryModule } from './otr-request-summary.module';

describe('OtrRequestSummaryComponent', () => {
  let component: OtrRequestSummaryComponent;
  let fixture: ComponentFixture<OtrRequestSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OtrRequestSummaryComponent],
      imports: [RectCardModule, TestSharedModule, OtrRequestSummaryModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtrRequestSummaryComponent);
    component = fixture.componentInstance;
    component.randomPickStartTimer = false;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create displaying data', () => {
    component.summary = null;
    expect(component.successful.value).toEqual(0);
    component.summary = {
      allocationUnderProcess: 1,
      unsuccessful: 1,
      rejected: 1,
      successful: {
        modified: 1,
        potentialFPIViolation: 1,
      },
      institutional: {
        pending: 1,
        modified: 1,
      },
      nonInstitutional: {
        pending: 1,
        modified: 1,
      },
    };
    expect(component.successful.value).toEqual(2);
  });

  it('should get remainingTime', () => {
    (component as any)._startTime = 0;
    expect(component.remainingTime).toBeTruthy();
  });

  it('should start timer', fakeAsync(() => {
    component.randomPickStartTimer = true;
    component.ngOnInit();
    tick(10000);
    component.ngOnDestroy();
    tick();
    expect(component.remainingTime).toBeTruthy();
  }));
});
