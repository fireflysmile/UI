import {Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {ModalService} from '../modal/modal.service';
import {SubscriptionService} from '../../services/subscription/subscription.service';

@Component({
  selector: 'app-editable-form-field-base',
  template: '',
})
export class EditableFormFieldBaseComponent<T> implements OnInit {
  // loading state
  @Input() loading = false;
  // modified emitter
  @Output() modified: EventEmitter<T> = new EventEmitter<T>();
  // editing state
  @HostBinding('class.cm-editing') editing = false;
  // base class
  @HostBinding('class.cm-editable-field') baseClass = true;

  constructor() { }

  ngOnInit() {
  }

}
