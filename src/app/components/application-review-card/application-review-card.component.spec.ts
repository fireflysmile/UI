import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationReviewCardComponent } from './application-review-card.component';

describe('ApplicationReviewCardComponent', () => {
  let component: ApplicationReviewCardComponent;
  let fixture: ComponentFixture<ApplicationReviewCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationReviewCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationReviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
