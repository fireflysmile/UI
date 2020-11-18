import {Component, Inject, OnInit} from '@angular/core';
import {TS_MODAL_DATA, TS_MODAL_REF} from '../modal/models/ts-modal-options';
import {TsModalRef} from '../modal/models/ts-modal-ref';

export interface DirectorSelectionModalData {
  // title
  title: string;
  // message
  message: string;
  // can select all or not
  canSelectAll: boolean;
  // selected directors
  selectedDirectors: string[];
  // selectable directors
  selectableDirectors: string[];
}

export interface DirectorOptionItem {
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-director-selection-modal',
  templateUrl: './director-selection-modal.component.html',
  styleUrls: ['./director-selection-modal.component.scss'],
})
export class DirectorSelectionModalComponent implements OnInit {
  // director options
  directors: DirectorOptionItem[] = [];

  constructor(
    @Inject(TS_MODAL_REF) public tsModalRef: TsModalRef<DirectorSelectionModalComponent>,
    @Inject(TS_MODAL_DATA) public data: DirectorSelectionModalData,
  ) { }

  ngOnInit() {
    this._createDirectorOptions();
  }

  /**
   * get select all state
   */
  get selectAll(): boolean {
    return this.directors.every(item => item.selected);
  }

  /**
   * set select all state
   * @param state selected state
   */
  set selectAll(state: boolean) {
    this.directors.forEach(item => item.selected = state);
  }

  /**
   * return true when at least one director selected
   */
  get hasSelectedDirector(): boolean {
    return this.directors.some(item => item.selected);
  }

  /**
   * create director options
   */
  private _createDirectorOptions(): void {
    this.directors = this.data.selectableDirectors.map(item => ({
      name: item,
      // set initial selected state
      selected: this.data.selectedDirectors.indexOf(item) !== -1,
    }));
  }

  /**
   * close modal with selected director list
   */
  onContinue(): void {
    this.tsModalRef.close(this.directors.filter(item => item.selected).map(item => item.name));
  }
}
