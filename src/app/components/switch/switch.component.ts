import {ChangeDetectorRef, Component, HostBinding, HostListener, OnInit, Optional, Self} from '@angular/core';
import {FormControlBaseDirective} from '../form-control-base/form-control-base.directive';
import {NgControl} from '@angular/forms';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent extends FormControlBaseDirective<boolean> implements OnInit {
  // turned on state
  @HostBinding('class.cm-switch-on') turnedOn = false;

  constructor(
    @Self() @Optional() public ngControl: NgControl,
    protected changeDetectorRef: ChangeDetectorRef,
  ) {
    super(ngControl, changeDetectorRef);
  }

  ngOnInit() {
  }

  /**
   * write value
   * @param value value
   */
  writeValue(value: boolean): void {
    this.turnedOn = value || false;
  }

  @HostListener('click')
  onHostClick(): void {
    this.setValue(!this.turnedOn);
  }
}
