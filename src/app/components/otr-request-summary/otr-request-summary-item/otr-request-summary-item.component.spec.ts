import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrRequestSummaryItemComponent } from './otr-request-summary-item.component';

describe('OtrRequestSummaryItemComponent', () => {
  let component: OtrRequestSummaryItemComponent;
  let fixture: ComponentFixture<OtrRequestSummaryItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtrRequestSummaryItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtrRequestSummaryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
