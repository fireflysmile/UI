import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalStatusItemComponent } from './approval-status-item.component';

describe('ApprovalStatusItemComponent', () => {
  let component: ApprovalStatusItemComponent;
  let fixture: ComponentFixture<ApprovalStatusItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalStatusItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalStatusItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
