import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AIMLSubmissionPageComponent } from './ai-ml-submission-page.component';

describe('AiMlSubmissionPageComponent', () => {
  let component: AIMLSubmissionPageComponent;
  let fixture: ComponentFixture<AIMLSubmissionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AIMLSubmissionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AIMLSubmissionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
