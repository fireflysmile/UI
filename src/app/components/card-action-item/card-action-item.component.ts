import {Component, HostBinding, Input, OnInit} from '@angular/core';

export type CmCardActionIcon =
  'selected-download'
  | 'filtered-download'
  | 'download'
  | 'clear'
  | 'reload'
  | 'grid'
  | 'upload'
  | 'save'
  | 'close'
  | 'eye'
  | 'eye-dot'
  | 'calendar-range'
  | 'delete'
  | 'assign'
  | 'details'
  | 'cloud-download'
  | 'cloud-upload';

@Component({
  selector: 'app-card-action-item',
  templateUrl: './card-action-item.component.html',
  styleUrls: ['./card-action-item.component.scss']
})
export class CardActionItemComponent implements OnInit {
  // icon
  @Input() icon: CmCardActionIcon;
  @Input() freeWidth: boolean;
  // disabled state
  @Input() @HostBinding('class.cm-disabled') disabled = false;

  constructor() { }

  ngOnInit() {
  }

}
