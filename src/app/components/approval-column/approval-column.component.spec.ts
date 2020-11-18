import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalColumnComponent } from './approval-column.component';

describe('ApprovalColumnComponent', () => {
  let component: ApprovalColumnComponent;
  let fixture: ComponentFixture<ApprovalColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
