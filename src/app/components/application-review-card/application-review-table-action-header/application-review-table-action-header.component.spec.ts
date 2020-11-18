import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { AutoCloserModule } from '../../auto-closer/auto-closer.module';
import { AutoPositionerModule } from '../../auto-positioner/auto-positioner.module';
import { MoreOptionsModule } from '../../more-options/more-options.module';

import { ApplicationReviewTableActionHeaderComponent } from './application-review-table-action-header.component';

describe('ApplicationReviewTableActionHeaderComponent', () => {
  let component: ApplicationReviewTableActionHeaderComponent;
  let fixture: ComponentFixture<ApplicationReviewTableActionHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationReviewTableActionHeaderComponent],
      imports: [TestSharedModule, AutoCloserModule, MoreOptionsModule, AutoPositionerModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationReviewTableActionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
