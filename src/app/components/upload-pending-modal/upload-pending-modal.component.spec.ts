import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { ModalModule } from '../modal/modal.module';
import { TS_MODAL_DATA, TS_MODAL_REF } from '../modal/models/ts-modal-options';

import { UploadPendingModalComponent } from './upload-pending-modal.component';

describe('UploadPendingModalComponent', () => {
  let component: UploadPendingModalComponent;
  let fixture: ComponentFixture<UploadPendingModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UploadPendingModalComponent],
      imports: [TestSharedModule, ModalModule],
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
    fixture = TestBed.createComponent(UploadPendingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
