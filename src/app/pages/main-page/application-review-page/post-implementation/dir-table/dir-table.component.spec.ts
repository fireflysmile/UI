import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalModule } from 'src/app/components/modal/modal.module';
import { PreviewPdfModule } from 'src/app/components/preview-pdf/preview-pdf.module';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { mockApplicationReview } from 'src/assets/data/application/mock-application-review';
import { InlineDocumentComponent } from '../inline-document/inline-document.component';

import { DirTableComponent } from './dir-table.component';

describe('DirTableComponent', () => {
  let component: DirTableComponent;
  let fixture: ComponentFixture<DirTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DirTableComponent, InlineDocumentComponent],
      imports: [TestSharedModule, PreviewPdfModule, ModalModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirTableComponent);
    component = fixture.componentInstance;
    component.application = mockApplicationReview;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
