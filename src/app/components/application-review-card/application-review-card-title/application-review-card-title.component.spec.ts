import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationReviewCardTitleComponent } from './application-review-card-title.component';

describe('ApplicationReviewCardTitleComponent', () => {
  let component: ApplicationReviewCardTitleComponent;
  let fixture: ComponentFixture<ApplicationReviewCardTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationReviewCardTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationReviewCardTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
