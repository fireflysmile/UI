import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalModule } from 'src/app/components/modal/modal.module';
import { PreviewPdfModule } from 'src/app/components/preview-pdf/preview-pdf.module';
import { FileService } from 'src/app/services/helpers/file.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';

import { DocumentCardComponent } from './document-card.component';

describe('DocumentCardComponent', () => {
  let component: DocumentCardComponent;
  let fixture: ComponentFixture<DocumentCardComponent>;
  let fileService: FileService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentCardComponent],
      imports: [TestSharedModule, PreviewPdfModule, ModalModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentCardComponent);
    fileService = TestBed.inject(FileService);
    component = fixture.componentInstance;
    component.document = {
      name: 'string',
      type: 'string',
      url: 'string',
      sharedWith: [],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should download success', () => {
    const spyOnDownload = spyOn(fileService, 'downloadFile');
    component.document = {
      url: '',
      name: '',
      type: '',
      sharedWith: [
        {
          id: 'id',
          name: 'name',
        },
        {
          id: 'id',
          name: 'name',
        },
        {
          id: 'id',
          name: 'name',
        },
      ],
    };
    component.ngOnInit();
    component.download();
    expect(spyOnDownload).toHaveBeenCalled();
  });
});
