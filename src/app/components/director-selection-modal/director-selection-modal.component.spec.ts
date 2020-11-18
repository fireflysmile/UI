import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Nl2brPipeModule } from 'src/app/pipes/nl2br-pipe/nl2br-pipe.module';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { ModalModule } from '../modal/modal.module';
import { TS_MODAL_DATA, TS_MODAL_REF } from '../modal/models/ts-modal-options';

import { DirectorSelectionModalComponent } from './director-selection-modal.component';

describe('DirectorSelectionModalComponent', () => {
  let component: DirectorSelectionModalComponent;
  let fixture: ComponentFixture<DirectorSelectionModalComponent>;
  let isClose = false;
  const tsModalRef = {
    close: () => {
      isClose = true;
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DirectorSelectionModalComponent],
      imports: [ModalModule, TestSharedModule, CheckboxModule, Nl2brPipeModule],
      providers: [
        {
          provide: TS_MODAL_DATA,
          useValue: {
            selectableDirectors: ['user 1', 'user 2'],
            selectedDirectors: [
              {
                name: 'user 1',
                selected: false,
              },
              {
                name: 'user 2',
                selected: true,
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
    fixture = TestBed.createComponent(DirectorSelectionModalComponent);
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
    expect(component.hasSelectedDirector).toEqual(true);
  });

  it('should close when continue', () => {
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
    component.onContinue();
    expect(isClose).toEqual(true);
  });
});
