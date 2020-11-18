import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconSubmissionOutlineComponent } from './icon-submission-outline.component';

describe('IconSubmissionOutlineComponent', () => {
  let component: IconSubmissionOutlineComponent;
  let fixture: ComponentFixture<IconSubmissionOutlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconSubmissionOutlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconSubmissionOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
