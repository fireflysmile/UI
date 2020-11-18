import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentWiseUtilizationComponent } from './segment-wise-utilization.component';

describe('SegmentWiseUtilizationComponent', () => {
  let component: SegmentWiseUtilizationComponent;
  let fixture: ComponentFixture<SegmentWiseUtilizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegmentWiseUtilizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentWiseUtilizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
