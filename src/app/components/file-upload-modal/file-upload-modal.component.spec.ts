import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { ModalModule } from '../modal/modal.module';
import { TS_MODAL_DATA, TS_MODAL_REF } from '../modal/models/ts-modal-options';

import { FileUploadModalComponent } from './file-upload-modal.component';

describe('FileUploadModalComponent', () => {
  let component: FileUploadModalComponent;
  let fixture: ComponentFixture<FileUploadModalComponent>;
  const modalData = {
    accepts: {
      findIndex: (cb) => cb('fileType'),
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FileUploadModalComponent],
      imports: [TestSharedModule, ModalModule],
      providers: [
        {
          provide: TS_MODAL_DATA,
          useValue: modalData,
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
    fixture = TestBed.createComponent(FileUploadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error for invalid file', () => {
    component.onFileChange({
      target: {
        files: [{ name: 'fileType' }],
      },
    } as any);
    expect(component.error).toEqual(null);
    component.onFileChange({
      target: {
        files: [null],
      },
    } as any);
    expect(component.error).toEqual(null);
    modalData.accepts = {
      findIndex: (cb) => (cb('.fileType') ? 1 : -1),
    };
    component.onFileChange({
      target: {
        files: [{ name: 'fileType' }],
      },
    } as any);
    expect(component.error).toEqual('Invalid file format');
    component.onFileChange({
      target: {
        files: [null],
      },
    } as any);
    expect(component.error).toEqual('Invalid file format');
    component.onFileChange({
      target: {
        files: [{ type: '.fileType' }],
      },
    } as any);
    expect(component.error).toEqual('Invalid file format');
  });
});
