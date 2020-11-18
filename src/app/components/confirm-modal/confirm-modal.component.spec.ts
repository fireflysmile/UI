import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Nl2brPipeModule } from 'src/app/pipes/nl2br-pipe/nl2br-pipe.module';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { ModalModule } from '../modal/modal.module';
import { TS_MODAL_DATA, TS_MODAL_REF } from '../modal/models/ts-modal-options';
import { TsModalRef } from '../modal/models/ts-modal-ref';

import { ConfirmModalComponent } from './confirm-modal.component';

describe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;
  let fixture: ComponentFixture<ConfirmModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmModalComponent],
      imports: [ModalModule, Nl2brPipeModule, TestSharedModule],
      providers: [
        {
          provide: TS_MODAL_DATA,
          useValue: {},
        },
        {
          provide: TS_MODAL_REF,
          useValue: TsModalRef,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
