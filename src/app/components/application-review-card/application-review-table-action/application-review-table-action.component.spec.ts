import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { AccessManagementFilterModule } from '../../access-management-filter/access-management-filter.module';
import { AccessManagementTableModule } from '../../access-management-table/access-management-table.module';

import { ApplicationReviewTableActionComponent } from './application-review-table-action.component';

describe('ApplicationReviewTableActionComponent', () => {
  let component: ApplicationReviewTableActionComponent;
  let fixture: ComponentFixture<ApplicationReviewTableActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationReviewTableActionComponent],
      imports: [
        TestSharedModule,
        AccessManagementFilterModule,
        AccessManagementTableModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationReviewTableActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
