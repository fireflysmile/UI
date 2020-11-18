import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-close-edited-warning',
  templateUrl: './close-edited-warning.component.html',
  styleUrls: ['./close-edited-warning.component.scss']
})
export class CloseEditedWarningComponent implements OnInit {

  @Output() close = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

}
