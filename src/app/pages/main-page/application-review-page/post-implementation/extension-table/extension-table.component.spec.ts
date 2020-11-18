import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { ModalModule } from 'src/app/components/modal/modal.module';
import { PreviewPdfModule } from 'src/app/components/preview-pdf/preview-pdf.module';
import { ApplicationService } from 'src/app/services/api/application.service';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { mockApplicationReview } from 'src/assets/data/application/mock-application-review';
import { InlineDocumentComponent } from '../inline-document/inline-document.component';

import { ExtensionTableComponent } from './extension-table.component';

describe('ExtensionTableComponent', () => {
  let component: ExtensionTableComponent;
  let fixture: ComponentFixture<ExtensionTableComponent>;
  let applicationService: ApplicationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExtensionTableComponent, InlineDocumentComponent],
      imports: [TestSharedModule, PreviewPdfModule, ModalModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    applicationService = TestBed.inject(ApplicationService);
    fixture = TestBed.createComponent(ExtensionTableComponent);
    component = fixture.componentInstance;
    component.application = _.cloneDeep(mockApplicationReview);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept', () => {
    spyOn(applicationService, 'respondToExtensionRequest').and.returnValue(
      of({} as any)
    );
    component.accept();
    expect(component.request.accepted).toEqual(true);
  });

  it('should reject', () => {
    spyOn(applicationService, 'respondToExtensionRequest').and.returnValue(
      of({} as any)
    );
    component.reject();
    expect(component.request.accepted).toEqual(false);
  });
});
