import {AfterViewInit, Directive, ElementRef, Input, OnDestroy} from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements AfterViewInit, OnDestroy {
  // ignore focus
  @Input() ignoreFocus = false;
  // timer
  private _timer;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
  ) { }

  ngAfterViewInit(): void {
    this._timer = setTimeout(() => {
      if (!this.ignoreFocus) {
        this.elementRef.nativeElement.focus();
      }
    });
  }

  ngOnDestroy(): void {
    clearTimeout(this._timer);
  }
}
