import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-request-for-extension',
  templateUrl: './request-for-extension.component.html',
  styleUrls: ['./request-for-extension.component.scss']
})
export class RequestForExtensionComponent implements OnInit {
  // submitted state
  @Input() submitted = false;

  constructor() { }

  ngOnInit() {
  }

}
