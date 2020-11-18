import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface CapsuleToggleOption {
  label: string;
  value: any;
}

@Component({
  selector: 'app-capsule-toggle',
  templateUrl: './capsule-toggle.component.html',
  styleUrls: ['./capsule-toggle.component.scss']
})
export class CapsuleToggleComponent implements OnInit {

  @Input() options: CapsuleToggleOption[];
  @Input() selectedValue: any;
  @Output() selectionChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    if (!this.selectedValue) {
      this.selectedValue = this.options[0].value;
      this.selectionChange.emit(this.selectedValue);
    }
  }

  public onOptionClick(option: CapsuleToggleOption) {
    if (option.value !== this.selectedValue) {
      this.selectionChange.emit(option.value);
    }
  }

}
