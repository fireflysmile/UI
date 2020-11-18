import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalModule } from 'src/app/components/modal/modal.module';
import { PreviewPdfModule } from 'src/app/components/preview-pdf/preview-pdf.module';
import { FileService } from 'src/app/services/helpers/file.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { LetterAttachmentCellComponent } from './letter-attachment-cell.component';

describe('LetterAttachmentCellComponent', () => {
  let component: LetterAttachmentCellComponent;
  let fixture: ComponentFixture<LetterAttachmentCellComponent>;
  let fileService: FileService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LetterAttachmentCellComponent],
      imports: [TestSharedModule, PreviewPdfModule, ModalModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterAttachmentCellComponent);
    component = fixture.componentInstance;
    fileService = TestBed.inject(FileService);
    component.attachment = {
      name: 'name',
      url: 'url',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should download letter', () => {
    const spyOnDownloadFile = spyOn(fileService, 'downloadFile');
    component.downloadLetter();
    expect(spyOnDownloadFile).toHaveBeenCalled();
  });

  it('should preview letter', () => {
    component.previewLetter();
    expect(component.previewLetterModal).toEqual('View Warning Letter');
    component.type = 'approval';
    component.previewLetter();
    expect(component.previewLetterModal).toEqual('View Approval Letter');
  });
});
