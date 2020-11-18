import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AssignedTaskTableModule } from 'src/app/components/assigned-task-table/assigned-task-table.module';
import { FinalApprovalModule } from 'src/app/components/final-approval/final-approval.module';
import { MyTaskCardModule } from 'src/app/components/my-task-card/my-task-card.module';
import { OlocAssignedTaskTableModule } from 'src/app/components/oloc-assigned-task-table/oloc-assigned-task-table.module';
import { PageContentModule } from 'src/app/components/page-content/page-content.module';
import { SplitApplicationCardModule } from 'src/app/components/split-application-card/split-application-card.module';
import { TableModule } from 'src/app/components/table/table.module';
import { TotalMyTaskModule } from 'src/app/components/total-my-task/total-my-task.module';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { MyTaskPageComponent } from './my-task-page.component';

describe('MyTaskPageComponent', () => {
  let component: MyTaskPageComponent;
  let fixture: ComponentFixture<MyTaskPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyTaskPageComponent],
      imports: [
        TotalMyTaskModule,
        MyTaskCardModule,
        FinalApprovalModule,
        AssignedTaskTableModule,
        TestSharedModule,
        PageContentModule,
        SplitApplicationCardModule,
        OlocAssignedTaskTableModule,
        TableModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTaskPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
