import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusTrackerService } from 'src/app/services/components/status-tracker.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { mockPostImplementationDetail } from 'src/assets/data/application/mock-application';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { DateOfChangeItemModule } from '../date-of-change-item/date-of-change-item.module';
import { ModalModule } from '../modal/modal.module';
import { TS_MODAL_DATA, TS_MODAL_REF } from '../modal/models/ts-modal-options';

import { PostImplementationCheckModalComponent } from './post-implementation-check-modal.component';

describe('PostImplementationCheckModalComponent', () => {
  let component: PostImplementationCheckModalComponent;
  let fixture: ComponentFixture<PostImplementationCheckModalComponent>;
  let statusTrackerService: StatusTrackerService;
  let isClose = false;
  const tsModalRef = {
    close: () => {
      isClose = true;
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostImplementationCheckModalComponent],
      imports: [
        TestSharedModule,
        ModalModule,
        CheckboxModule,
        DateOfChangeItemModule,
      ],
      providers: [
        {
          provide: TS_MODAL_DATA,
          useValue: {
            selectedDirectors: [],
            notIncomingResigningDirectors: [
              {
                date: true,
              },
            ],
          },
        },
        {
          provide: TS_MODAL_REF,
          useValue: tsModalRef,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostImplementationCheckModalComponent);
    statusTrackerService = TestBed.inject(StatusTrackerService);

    statusTrackerService.postImplementationDetail = mockPostImplementationDetail;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select directors', () => {
    component.directors = [
      {
        name: 'name',
        selected: false,
      },
    ];
    component.selectAll = true;
    expect(component.selectAll).toEqual(true);
    expect(component.allDateSelected).toEqual(true);
    expect(component.hasSelectedDirector).toEqual(true);
  });

  it('should close when process', () => {
    component.directors = [
      {
        name: 'name',
        selected: false,
      },
      {
        name: 'name',
        selected: true,
      },
    ];
    expect(isClose).toEqual(false);
    component.onProceed();
    expect(isClose).toEqual(true);
  });

  it('should check valid', () => {
    spyOnProperty(
      component,
      'hasNotIncomingResigningDirectors'
    ).and.returnValue(false);
    expect(component.valid).toEqual(false);
  });
});
