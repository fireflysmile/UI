import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaturityTimelineComponent } from './maturity-timeline.component';

describe('MaturityTimelineComponent', () => {
  let component: MaturityTimelineComponent;
  let fixture: ComponentFixture<MaturityTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaturityTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaturityTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
