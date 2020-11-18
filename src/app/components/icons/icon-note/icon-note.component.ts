import { Component, OnInit } from '@angular/core';
import {IconBaseComponent} from '../icon-base/icon-base.component';

@Component({
  selector: 'app-icon-note',
  templateUrl: './icon-note.component.html',
  styleUrls: ['./icon-note.component.scss']
})
export class IconNoteComponent extends IconBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
