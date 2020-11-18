import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AutoSizeTextareaModule } from 'src/app/components/auto-size-textarea/auto-size-textarea.module';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { CheckerCommentsComponent } from './checker-comments.component';

describe('CheckerCommentsComponent', () => {
  let component: CheckerCommentsComponent;
  let fixture: ComponentFixture<CheckerCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckerCommentsComponent],
      imports: [TestSharedModule, AutoSizeTextareaModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckerCommentsComponent);
    component = fixture.componentInstance;
    component.comments = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sort comment', () => {
    component.comments = [
      {
        text: 'comment 1',
        date: new Date(2010, 7, 6),
      },
      {
        text: 'comment 2',
        date: new Date(2015, 7, 6),
      },
    ];
    component.ngOnInit();
    expect(component.comments[0].text).toEqual('comment 2');
  });
});
