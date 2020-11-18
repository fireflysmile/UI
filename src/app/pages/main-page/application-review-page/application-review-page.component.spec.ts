import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationReviewCardModule } from 'src/app/components/application-review-card/application-review-card.module';
import { BackButtonModule } from 'src/app/components/back-button/back-button.module';
import { PageContentModule } from 'src/app/components/page-content/page-content.module';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { ApplicationReviewPageComponent } from './application-review-page.component';

describe('ApplicationReviewPageComponent', () => {
  let component: ApplicationReviewPageComponent;
  let fixture: ComponentFixture<ApplicationReviewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationReviewPageComponent],
      imports: [BackButtonModule, ApplicationReviewCardModule, TestSharedModule, PageContentModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationReviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
