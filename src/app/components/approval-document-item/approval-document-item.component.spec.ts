import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { ApprovalDocumentItemComponent } from './approval-document-item.component';

describe('ApprovalDocumentItemComponent', () => {
  let component: ApprovalDocumentItemComponent;
  let fixture: ComponentFixture<ApprovalDocumentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovalDocumentItemComponent],
      imports: [TestSharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalDocumentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
