import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { ModalModule } from '../modal/modal.module';
import { TS_MODAL_DATA, TS_MODAL_REF } from '../modal/models/ts-modal-options';

import { PcDownloadErrorModalComponent } from './pc-download-error-modal.component';

describe('PcDownloadErrorModalComponent', () => {
  let component: PcDownloadErrorModalComponent;
  let fixture: ComponentFixture<PcDownloadErrorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PcDownloadErrorModalComponent],
      imports: [TestSharedModule, ModalModule],
      providers: [
        {
          provide: TS_MODAL_DATA,
          useValue: {
            response: {
              total: 0,
              errors: [],
            },
          },
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
    fixture = TestBed.createComponent(PcDownloadErrorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
