import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalModule } from 'src/app/components/modal/modal.module';
import { PreviewPdfModule } from 'src/app/components/preview-pdf/preview-pdf.module';
import { FileService } from 'src/app/services/helpers/file.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { InlineDocumentComponent } from './inline-document.component';

describe('InlineDocumentComponent', () => {
  let component: InlineDocumentComponent;
  let fixture: ComponentFixture<InlineDocumentComponent>;
  let fileService: FileService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InlineDocumentComponent],
      imports: [TestSharedModule, PreviewPdfModule, ModalModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineDocumentComponent);
    fileService = TestBed.inject(FileService);
    component = fixture.componentInstance;
    component.document = {
      type: 'type',
      name: 'name',
      url: 'url',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should download success', () => {
    const spyOnDownload = spyOn(fileService, 'downloadFile');
    component.download();
    expect(spyOnDownload).toHaveBeenCalled();
  });
});
