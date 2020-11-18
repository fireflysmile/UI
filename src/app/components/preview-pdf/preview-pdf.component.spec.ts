import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PDFDocumentProxy, PdfViewerModule } from 'ng2-pdf-viewer';
import { FileService } from 'src/app/services/helpers/file.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { CardActionItemModule } from '../card-action-item/card-action-item.module';

import { PreviewPdfComponent } from './preview-pdf.component';

describe('PreviewPdfComponent', () => {
  let component: PreviewPdfComponent;
  let fixture: ComponentFixture<PreviewPdfComponent>;
  let fileService: FileService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PreviewPdfComponent],
      imports: [TestSharedModule, PdfViewerModule, CardActionItemModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewPdfComponent);
    fileService = TestBed.inject(FileService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update src when change', () => {
    component.url = 'test';
    component.ngOnChanges();
    expect(component.src).toEqual(component.src);
  });

  it('should open url', () => {
    const spyOnOpen = spyOn(window, 'open');
    component.launch();
    expect(spyOnOpen).toHaveBeenCalled();
  });

  it('should download success', () => {
    const spyOnDownload = spyOn(fileService, 'downloadFile');
    component.download();
    expect(spyOnDownload).toHaveBeenCalled();
  });

  it('should load success', () => {
    component.onLoad({
      numPages: 10,
      fingerprint: '',
    } as any);
    expect(component.page).toEqual(1);
    expect(component.numPages).toEqual(10);
  });
});
