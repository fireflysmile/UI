import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { FormFieldModule } from '../form-field/form-field.module';
import { ModalModule } from '../modal/modal.module';
import { TS_MODAL_DATA, TS_MODAL_REF } from '../modal/models/ts-modal-options';
import { RectCardModule } from '../rect-card/rect-card.module';

import { PcClientMapErrorModalComponent } from './pc-client-map-error-modal.component';

describe('PcClientMapErrorModalComponent', () => {
  let component: PcClientMapErrorModalComponent;
  let fixture: ComponentFixture<PcClientMapErrorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PcClientMapErrorModalComponent],
      imports: [TestSharedModule, ModalModule, RectCardModule, FormFieldModule],
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
    fixture = TestBed.createComponent(PcClientMapErrorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
