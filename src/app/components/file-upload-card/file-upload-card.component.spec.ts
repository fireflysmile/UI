import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { MessageService } from '../message/message.service';
import { ModalModule } from '../modal/modal.module';
import { PreviewPdfModule } from '../preview-pdf/preview-pdf.module';
import { RectCardModule } from '../rect-card/rect-card.module';

import { FileUploadCardComponent } from './file-upload-card.component';

describe('FileUploadCardComponent', () => {
  let component: FileUploadCardComponent;
  let fixture: ComponentFixture<FileUploadCardComponent>;
  let messageService: MessageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FileUploadCardComponent],
      imports: [
        TestSharedModule,
        RectCardModule,
        PreviewPdfModule,
        ModalModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadCardComponent);
    component = fixture.componentInstance;
    messageService = TestBed.inject(MessageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should upload file', () => {
    const testInput = {
      files: [],
      value: 'value',
    };
    component.onFileChange({
      target: testInput,
    } as any);
    expect(testInput.value).toEqual(null);

    const spyOnUpload = spyOn(component.fileUploaded, 'emit');
    component.onFileChange({
      target: {
        files: [new File([new Blob()], 'dummy.pdf', { type: 'pdf' })],
      },
    } as any);
    expect(spyOnUpload).toHaveBeenCalled();

    const spyOnMessageOpen = spyOn(messageService, 'open');
    spyOn(component, 'checkFileTotalSize').and.returnValue(false);
    component.onFileChange({
      target: {
        files: [new File([new Blob()], 'dummy.pdf', { type: 'pdf' })],
      },
    } as any);
    expect(spyOnMessageOpen).toHaveBeenCalled();
  });
});
