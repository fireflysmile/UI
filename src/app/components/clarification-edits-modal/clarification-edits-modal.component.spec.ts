import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ApplicationService } from 'src/app/services/api/application.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { ModalModule } from '../modal/modal.module';
import { TS_MODAL_DATA, TS_MODAL_REF } from '../modal/models/ts-modal-options';
import { TsModalRef } from '../modal/models/ts-modal-ref';

import { ClarificationEditsModalComponent } from './clarification-edits-modal.component';

describe('ClarificationEditsModalComponent', () => {
  let component: ClarificationEditsModalComponent;
  let applicationService: ApplicationService;
  let fixture: ComponentFixture<ClarificationEditsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClarificationEditsModalComponent],
      imports: [TestSharedModule, ModalModule],
      providers: [
        {
          provide: TS_MODAL_DATA,
          useValue: {
            clarifications: [],
          },
        },
        {
          provide: TS_MODAL_REF,
          useValue: TsModalRef,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClarificationEditsModalComponent);
    component = fixture.componentInstance;
    applicationService = TestBed.inject(ApplicationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get applications edits when init', () => {
    const spyOnGetApplication = spyOn(
      applicationService,
      'getApplicationEdits'
    ).and.returnValue(of([]));
    component.ngOnInit();
    expect(spyOnGetApplication).toHaveBeenCalled();
  });
});
