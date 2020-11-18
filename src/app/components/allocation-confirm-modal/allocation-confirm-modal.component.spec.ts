import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { ModalModule } from '../modal/modal.module';
import { TS_MODAL_DATA, TS_MODAL_REF } from '../modal/models/ts-modal-options';

import { AllocationConfirmModalComponent } from './allocation-confirm-modal.component';

describe('AllocationConfirmModalComponent', () => {
  let component: AllocationConfirmModalComponent;
  let fixture: ComponentFixture<AllocationConfirmModalComponent>;
  const mockData = {
    unallocatedQty: 0,
    unallocatedValue: 0,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AllocationConfirmModalComponent],
      imports: [TestSharedModule, ModalModule],
      providers: [
        {
          provide: TS_MODAL_DATA,
          useValue: mockData,
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
    fixture = TestBed.createComponent(AllocationConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set unlocated text', () => {
    mockData.unallocatedQty = 10;
    mockData.unallocatedValue = 10;
    component.ngOnInit();
    expect(component.unallocatedText).toEqual('quantity 10.00 and value 10.00');
  });
});
