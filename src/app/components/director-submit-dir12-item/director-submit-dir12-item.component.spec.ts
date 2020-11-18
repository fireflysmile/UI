import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestSharedModule } from 'src/app/test/test-shared.module';
import { MessageService } from '../message/message.service';
import { ModalModule } from '../modal/modal.module';
import { ModalService } from '../modal/modal.service';
import { PreviewPdfModule } from '../preview-pdf/preview-pdf.module';

import { DirectorSubmitDir12ItemComponent } from './director-submit-dir12-item.component';

describe('DirectorSubmitDir12ItemComponent', () => {
  let component: DirectorSubmitDir12ItemComponent;
  let fixture: ComponentFixture<DirectorSubmitDir12ItemComponent>;
  let modalService: ModalService;
  let messageService: MessageService;
  let spyOnModalOpen;
  let onClose;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DirectorSubmitDir12ItemComponent],
      imports: [TestSharedModule, PreviewPdfModule, ModalModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorSubmitDir12ItemComponent);
    messageService = TestBed.inject(MessageService);
    modalService = TestBed.inject(ModalService);
    spyOnModalOpen = spyOn(modalService, 'open').and.callFake(
      (_component, data) => {
        onClose = data.onClose;
        return { close: () => {} } as any;
      }
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create directors', () => {
    component.directors = null;
    expect(component.directors.length).toEqual(0);
    component.directors = [
      {
        name: 'name',
        success: false,
        directors: ['director 1', 'director 2'],
        uploaded: {
          name: 'file name',
          url: 'file url',
        },
      },
      {
        name: 'name',
        success: false,
        directors: ['director 1', 'director 2'],
        uploaded: null,
      },
    ];
    fixture.detectChanges();
    expect(component.directors.length).toEqual(2);

    component.availableDirectors = null;
    expect(component.availableDirectors.length).toEqual(0);
    component.availableDirectors = [
      {
        name: 'name',
        success: false,
        directors: ['director 1', 'director 2'],
        uploaded: {
          name: 'file name',
          url: 'file url',
        },
      },
      {
        name: 'name',
        success: false,
        directors: ['director 1', 'director 2'],
        uploaded: null,
      },
    ];
    fixture.detectChanges();
    expect(component.availableDirectors.length).toEqual(2);

    component.director = {
      name: 'name',
      success: false,
      directors: ['director 1', 'director 2'],
      uploaded: {
        name: 'file name',
        url: 'file url',
      },
    };
    component.checkAddition();
    expect(component.added).toEqual(false);
  });

  it('should set director uploaded file', () => {
    const spyOnCheckChanges = spyOn(component.checkChanges, 'emit');
    component.director = {
      name: 'name',
      success: false,
      directors: ['director 1', 'director 2'],
      uploaded: {
        name: 'file name',
        url: 'file url',
      },
    };
    component.onFileChange({
      target: {
        files: [],
      },
    } as any);
    expect(spyOnCheckChanges).not.toHaveBeenCalled();

    component.onFileChange({
      target: {
        files: [new File([new Blob()], 'dummy.pdf', { type: 'pdf' })],
      },
    } as any);
    expect(spyOnCheckChanges).toHaveBeenCalled();

    const spyOnMessageOpen = spyOn(messageService, 'open');
    spyOn(component, 'checkFileTotalSize').and.returnValue(false);
    component.onFileChange({
      target: {
        files: [new File([new Blob()], 'dummy.pdf', { type: 'pdf' })],
      },
    } as any);
    expect(spyOnMessageOpen).toHaveBeenCalled();
  });

  it('should open modal when click delete', () => {
    component.director = {
      name: 'name',
      success: false,
      directors: ['director 1', 'director 2'],
      uploaded: {
        name: 'file name',
        url: 'file url',
      },
    };

    component.onClickDelete();
    expect(spyOnModalOpen).toHaveBeenCalled();
    spyOnModalOpen.calls.reset();

    const spyOnCheckChanges = spyOn(component.checkChanges, 'emit');
    onClose(false);
    expect(spyOnCheckChanges).not.toHaveBeenCalled();
    onClose(true);
    expect(spyOnCheckChanges).toHaveBeenCalled();
  });

  it('should open modal when selecting director', () => {
    component.availableDirectors = [
      {
        name: 'name 1',
        success: false,
        directors: ['director 1', 'director 2'],
        uploaded: {
          name: 'file name',
          url: 'file url',
        },
      },
      {
        name: 'name 2',
        success: false,
        directors: ['director 1', 'director 2'],
        uploaded: null,
      },
      {
        name: 'name',
        success: false,
        directors: ['director 1', 'director 2'],
        uploaded: null,
      },
    ];
    component.director = {
      name: 'name',
      success: false,
      directors: ['director 1', 'director 2'],
      uploaded: {
        name: 'file name',
        url: 'file url',
      },
    };

    component.openDirectorSelectionModal();
    expect(spyOnModalOpen).toHaveBeenCalled();
    spyOnModalOpen.calls.reset();

    const spyOnCheckChanges = spyOn(component.checkChanges, 'emit');
    onClose(false);
    expect(spyOnCheckChanges).not.toHaveBeenCalled();
    onClose(true);
    expect(spyOnCheckChanges).toHaveBeenCalled();
  });

  it('should remove director', () => {
    component.directors = [
      {
        name: 'name 1',
        success: false,
        directors: ['director 1', 'director 2'],
        uploaded: {
          name: 'file name',
          url: 'file url',
        },
      },
      {
        name: 'name 2',
        success: false,
        directors: ['director 1', 'director 2'],
        uploaded: null,
      },
      {
        name: 'name',
        success: false,
        directors: ['director 1', 'director 2'],
        uploaded: null,
      },
    ];
    component.director = {
      name: 'name',
      success: false,
      directors: ['director 1', 'director 2'],
      uploaded: {
        name: 'file name',
        url: 'file url',
      },
    };
    const spyOnCheckChanges = spyOn(component.checkChanges, 'emit');
    component.removeSelectedDirector('name');
    expect(spyOnCheckChanges).toHaveBeenCalled();
    expect(component.directors.length).toEqual(3);
  });
});
