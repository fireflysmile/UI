import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { ModalModule } from '../modal/modal.module';
import { TS_MODAL_DATA, TS_MODAL_REF } from '../modal/models/ts-modal-options';

import { PcModificationConfirmModalComponent } from './pc-modification-confirm-modal.component';

describe('PcModificationConfirmModalComponent', () => {
  let component: PcModificationConfirmModalComponent;
  let fixture: ComponentFixture<PcModificationConfirmModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PcModificationConfirmModalComponent],
      imports: [TestSharedModule, ModalModule],
      providers: [
        {
          provide: TS_MODAL_DATA,
          useValue: {
            items: [],
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
    fixture = TestBed.createComponent(PcModificationConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
