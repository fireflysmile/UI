import {AfterViewInit, Directive, ElementRef, HostListener, Input, OnDestroy, Renderer2} from '@angular/core';
import {onlyForNoneIE} from '../../utils/other.utils';

/**
 * @description
 * this directive sets element position as fixed after viewInit
 * popup/tooltip can use this class to fix it's position
 */
@Directive({
  selector: '[appPositionFixer]',
  exportAs: 'appPositionFixerDirective',
})
export class PositionFixerDirective implements AfterViewInit, OnDestroy {
  // fix size
  @Input() fixSize = false;
  // reposition
  @Input() reposition = false;
  // frame
  private _frame;

  constructor(
    private renderer2: Renderer2,
    private elementRef: ElementRef<HTMLElement>,
  ) {
    this._repositioning = this._repositioning.bind(this);
  }

  ngAfterViewInit(): void {
    this._setFixedPosition();

    onlyForNoneIE(() => {
      if (this.reposition) {
        this._frame = requestAnimationFrame(this._repositioning);
      }
    });
  }

  ngOnDestroy() {
    cancelAnimationFrame(this._frame);
  }

  private _repositioning(): void {
    this._repositionElement();
    this._frame = requestAnimationFrame(this._repositioning);
  }

  /**
   * set fixed position of element
   */
  private _setFixedPosition(): void {
    const el = this.elementRef.nativeElement;

    if (el) {
      const rect = el.getBoundingClientRect();

      this.renderer2.setStyle(el, 'position', 'fixed');
      this.renderer2.setStyle(el, 'left', rect.left + 'px');
      this.renderer2.setStyle(el, 'top', rect.top + 'px');

      if (this.fixSize) {
        this.renderer2.setStyle(el, 'width', rect.width + 'px');
        this.renderer2.setStyle(el, 'height', rect.height + 'px');
      }
    }
  }

  /**
   * emit windowScroll when window scrolled
   */
  @HostListener('window:scroll')
  onWindowScroll(): void {
    this._repositionElement();
  }

  @HostListener('window:wheel')
  onWindowWheel(): void {
    this._repositionElement();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this._repositionElement();
  }

  private _repositionElement(): void {
    if (this.reposition) {
      const el = this.elementRef.nativeElement;

      if (el) {
        this.renderer2.removeStyle(el, 'position');
        this.renderer2.removeStyle(el, 'left');
        this.renderer2.removeStyle(el, 'top');

        if (this.fixSize) {
          this.renderer2.removeStyle(el, 'width');
          this.renderer2.removeStyle(el, 'height');
        }

        this._setFixedPosition();
      }
    }
  }
}
