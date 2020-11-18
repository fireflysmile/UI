import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconSubmissionComponent } from './icon-submission.component';

describe('IconSubmissionComponent', () => {
  let component: IconSubmissionComponent;
  let fixture: ComponentFixture<IconSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
