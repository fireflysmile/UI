import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconApprovalsComponent } from './icon-approvals.component';

describe('IconApprovalsComponent', () => {
  let component: IconApprovalsComponent;
  let fixture: ComponentFixture<IconApprovalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconApprovalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
