import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-yes-no-toggle',
  templateUrl: './yes-no-toggle.component.html',
  styleUrls: ['./yes-no-toggle.component.scss']
})
export class YesNoToggleComponent implements OnInit {

  @Input() value: 'Yes' | 'No';
  @Input() disabled: boolean;
  @Output() toggle = new EventEmitter<'Yes' | 'No'>();

  constructor() { }

  ngOnInit() {
  }

  public onToggle(value: 'Yes' | 'No') {
    if (this.disabled) { return; }
    if (this.value === value) { return; }
    this.value = value;
    this.toggle.emit(this.value);
  }

}
