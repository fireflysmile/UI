import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ApplicationService } from 'src/app/services/api/application.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { SplitApplicationCardModule } from '../split-application-card/split-application-card.module';

import { SplitApplicationDetailedSummaryComponent } from './split-application-detailed-summary.component';

describe('SplitApplicationDetailedSummaryComponent', () => {
  let component: SplitApplicationDetailedSummaryComponent;
  let fixture: ComponentFixture<SplitApplicationDetailedSummaryComponent>;
  let applicationService: ApplicationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SplitApplicationDetailedSummaryComponent],
      imports: [SplitApplicationCardModule, TestSharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitApplicationDetailedSummaryComponent);
    applicationService = TestBed.inject(ApplicationService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not update total if summary is null', () => {
    spyOn(applicationService, 'getApplicationDetailedSummaries').and.returnValue(of(null));
    component.total = 0;
    component.ngOnInit();
    expect(component.total).toEqual(0);
  });
});
