import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { of } from 'rxjs';
import { TaskService } from 'src/app/services/api/task.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { ExtendedFormModule } from '../extended-form/extended-form.module';
import { FormFieldModule } from '../form-field/form-field.module';
import { MessageService } from '../message/message.service';
import { ModalModule } from '../modal/modal.module';
import { TS_MODAL_DATA, TS_MODAL_REF } from '../modal/models/ts-modal-options';
import { SelectModule } from '../select/select.module';

import { AssignModalComponent } from './assign-modal.component';

describe('AssignModalComponent', () => {
  let component: AssignModalComponent;
  let fixture: ComponentFixture<AssignModalComponent>;
  let taskService: TaskService;
  let messageService: MessageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssignModalComponent],
      imports: [
        ModalModule,
        FormFieldModule,
        SelectModule,
        ExtendedFormModule,
        TestSharedModule,
      ],
      providers: [
        {
          provide: TS_MODAL_DATA,
          useValue: {},
        },
        {
          provide: TS_MODAL_REF,
          useValue: {
            close: () => {},
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignModalComponent);
    taskService = TestBed.inject(TaskService);
    messageService = TestBed.inject(MessageService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal when assign to application', () => {
    const spyOnAssignToTask = spyOn(
      taskService,
      'assignToTask'
    ).and.returnValue(of({} as any));
    const spyOnMessageOpen = spyOn(messageService, 'open');
    component.assignToApplication();
    expect(spyOnAssignToTask).toHaveBeenCalled();
    expect(spyOnMessageOpen).toHaveBeenCalled();
  });

  it('should validate correct', () => {
    component.isHO = true;
    component.group.controls.official.patchValue(null);
    expect(component.group.controls.official.invalid).toEqual(true);
  });
});
