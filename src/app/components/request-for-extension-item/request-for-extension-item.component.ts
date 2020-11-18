import {Component, Input, OnInit} from '@angular/core';

export type RequestForExtensionItemIcon =
  'check-circle'
  | 'submission'
  | 'calendar'
  | 'text-underline'
  | 'document';

@Component({
  selector: 'app-request-for-extension-item',
  templateUrl: './request-for-extension-item.component.html',
  styleUrls: ['./request-for-extension-item.component.scss']
})
export class RequestForExtensionItemComponent implements OnInit {
  // icon
  @Input() icon: RequestForExtensionItemIcon;

  constructor() { }

  ngOnInit() {
  }

}
