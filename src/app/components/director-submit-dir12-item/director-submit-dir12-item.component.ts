import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AvailableDirector} from '../../models/post-implementation-detail';
import {environment} from '../../../environments/environment';
import {checkFileTotalSize} from '../../utils/file.util';
import {MessageService} from '../message/message.service';
import {ModalService} from '../modal/modal.service';
import {ConfirmModalComponent, ConfirmModalData} from '../confirm-modal/confirm-modal.component';
import {
  DirectorSelectionModalComponent,
  DirectorSelectionModalData
} from '../director-selection-modal/director-selection-modal.component';

const {
  dir12UploaderConfig,
} = environment;

@Component({
  selector: 'app-director-submit-dir12-item',
  templateUrl: './director-submit-dir12-item.component.html',
  styleUrls: ['./director-submit-dir12-item.component.scss']
})
export class DirectorSubmitDir12ItemComponent implements OnInit, AfterViewInit {
  // set director
  @Input() set director(director: AvailableDirector) {
    this._director = director;
    this._filterCurrentDirector();
  }
  // set total directors
  @Input() set directors(directors: AvailableDirector[]) {
    this._directors = directors || [];
  }
  // set available directors
  @Input() set availableDirectors(availableDirectors: AvailableDirector[]) {
    this._availableDirectors = availableDirectors || [];
    this._filterCurrentDirector();
  }

  @Input() editable: boolean;
  // check changes
  @Output() checkChanges: EventEmitter<void> = new EventEmitter();
  // show viewer
  showViewer = false;
  // limits
  limits = dir12UploaderConfig.limits;
  // accepts
  accepts = dir12UploaderConfig.accepts;
  // added to other direction
  added = false;
  // filtered directors
  filteredDirectors: AvailableDirector[] = [];
  // director
  private _director: AvailableDirector;
  // directors
  private _directors: AvailableDirector[] = [];
  // available directors
  private _availableDirectors: AvailableDirector[] = [];

  constructor(
    private modalService: ModalService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.checkAddition();
  }

  get director(): AvailableDirector {
    return this._director;
  }

  get directors(): AvailableDirector[] {
    return this._directors;
  }

  get availableDirectors(): AvailableDirector[] {
    return this._availableDirectors;
  }

  private _filterCurrentDirector(): void {
    if (this.director) {
      this.filteredDirectors = this._availableDirectors.filter(item => item.name !== this.director.name);
    }
  }

  /**
   * check addition
   */
  checkAddition(): void {
    this.added = !!(this.director && this.directors.find(item => item.directors.indexOf(this.director.name) !== -1));
  }

  /**
   * handle file upload event
   * @param event event
   */
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files[0];

    this.handleFileChange(file);

    input.value = null;
  }

  checkFileTotalSize(files: FileList | File[], limit: number): boolean {
    return checkFileTotalSize(files, limit);
  }

  /**
   * handle file change
   * @param file file
   */
  handleFileChange(file: File): void {
    if (file) {
      if (this.checkFileTotalSize([file], this.limits)) {
        this.director.uploaded = {
          name: file.name,
          url: '/assets/files/dummy.pdf',
        };

        this.checkChanges.emit();
      } else {
        this.messageService.open('error', 'Maximum file size is 5mb');
      }
    }
  }

  /**
   * open confirm modal on click delete
   */
  onClickDelete(): void {
    this.modalService.open(ConfirmModalComponent, {
      data: {
        title: 'Remove document',
        content: 'Are you sure want to remove this document?'
      } as ConfirmModalData,
      onClose: res => {
        if (res) {
          this.director.uploaded = null;
          this.checkChanges.emit();
        }
      }
    });
  }

  /**
   * open director selection modal
   */
  openDirectorSelectionModal(): void {
    this.modalService.open(DirectorSelectionModalComponent, {
      data: {
        title: 'Select Directors',
        message: 'For DIR 12 that you have uploaded,\nplease select the directors it is applicable for',
        canSelectAll: false,
        selectedDirectors: this.director.directors,
        selectableDirectors: this.filteredDirectors.map(item => item.name),
      } as DirectorSelectionModalData,
      onClose: res => {
        if (res) {
          this.director.directors = res;
          this.checkChanges.emit();
        }
      },
    });
  }

  /**
   * remove selected director
   * @param director director to remove
   */
  removeSelectedDirector(director: string): void {
    this.director.directors = this.director.directors.filter(item => item !== director);
    this.checkChanges.emit();
  }
}
