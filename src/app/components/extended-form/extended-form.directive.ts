import {AfterViewInit, ChangeDetectorRef, Directive, EventEmitter, HostListener, Optional, Output, Self} from '@angular/core';
import {ControlContainer} from '@angular/forms';
import {neutralizeEvent} from '../../utils/event.util';

@Directive({
  selector: 'form[appExtendedForm]',
  exportAs: 'extendedForm',
})
export class ExtendedFormDirective implements AfterViewInit {
  // valid submit
  @Output() validSubmit: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    @Optional() @Self() public controlContainer: ControlContainer,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  /**
   * suppress default event and call validateForm() method
   * @param event submit event
   */
  @HostListener('submit', ['$event'])
  onHostSubmit(event?: Event): void {
    neutralizeEvent(event);
    this.submit();
  }

  /**
   * emit validSubmit when form group is valid after marking all as touched
   */
  submit(): void {
    if (this.controlContainer && this.controlContainer.control) {
      this.controlContainer.control.markAllAsTouched();

      if (!this.controlContainer.invalid) {
        this.validSubmit.emit();
      }
    }
  }
}
