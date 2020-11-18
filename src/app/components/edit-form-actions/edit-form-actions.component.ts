import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-form-actions',
  templateUrl: './edit-form-actions.component.html',
  styleUrls: ['./edit-form-actions.component.scss']
})
export class EditFormActionsComponent implements OnInit {

  @Output() edit = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  @Input() isEditing: boolean;

  constructor() { }

  ngOnInit() {
  }

  public onEdit() {
    this.edit.emit();
  }

  public onCancel() {
    this.cancel.emit();
  }

  public onSave() {
    this.save.emit();
  }

}
