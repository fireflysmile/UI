import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AutoSizeTextareaModule } from 'src/app/components/auto-size-textarea/auto-size-textarea.module';
import { AppService } from 'src/app/services/components/app.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { CheckerCommentsComponent } from '../checker-comments/checker-comments.component';

import { RejectionTableComponent } from './rejection-table.component';

describe('RejectionTableComponent', () => {
  let component: RejectionTableComponent;
  let fixture: ComponentFixture<RejectionTableComponent>;
  let appService: AppService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RejectionTableComponent, CheckerCommentsComponent],
      imports: [TestSharedModule, AutoSizeTextareaModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    appService = TestBed.inject(AppService);
    appService.userInfo = {
      role: 'RO',
      checker: false,
    };
    fixture = TestBed.createComponent(RejectionTableComponent);
    component = fixture.componentInstance;
    component.approval = {
      status: 'status',
      rejectionReason: 'rejection',
      comments: [
        {
          text: 'comment',
          date: new Date(2010, 7, 6),
        },
      ],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update editable when change', () => {
    component.editable = false;
    component.ngOnChanges();
    expect(component.editable).toEqual(false);
    component.viewType = 'maker';
    component.ngOnChanges();
    expect(component.editable).toEqual(false);
    component.viewType = 'checker';
    component.ngOnChanges();
    expect(component.editable).toEqual(true);
  });
});
