import {
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import {AvailableDirector} from '../../models/post-implementation-detail';
import {DirectorSubmitDir12ItemComponent} from '../director-submit-dir12-item/director-submit-dir12-item.component';

@Component({
  selector: 'app-director-submit-dir12',
  templateUrl: './director-submit-dir12.component.html',
  styleUrls: ['./director-submit-dir12.component.scss']
})
export class DirectorSubmitDir12Component implements OnInit {
  // available directors
  @Input() set directors(directors: AvailableDirector[]) {
    this._directors = directors || [];
    this.errorDirectors = this._directors.filter(item => !item.success);
    this._createAvailableDirectors();
  }
  @Input() submitted: boolean;
  // children
  @ViewChildren(DirectorSubmitDir12ItemComponent) children: QueryList<DirectorSubmitDir12ItemComponent>;
  // errored directors
  errorDirectors: AvailableDirector[] = [];
  // available directors
  availableDirectors: AvailableDirector[] = [];
  // whole directors
  private _directors: AvailableDirector[] = [];

  constructor() { }

  ngOnInit() {
  }

  get directors(): AvailableDirector[] {
    return this._directors;
  }

  /**
   * change changes
   */
  checkChanges(): void {
    this.children.forEach(item => item.checkAddition());
    this._createAvailableDirectors();
  }

  private _createAvailableDirectors(): void {
    let allAddedDirectors: string[] = [];

    this._directors.forEach(item => allAddedDirectors.push(...item.directors));

    allAddedDirectors = allAddedDirectors.filter((v, i, a) => a.indexOf(v) === i);

    this.availableDirectors = this._directors.filter(item => {
      return !item.success && !item.uploaded && allAddedDirectors.indexOf(item.name) === -1;
    });
  }
}
